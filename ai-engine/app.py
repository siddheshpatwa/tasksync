from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

# Load spaCy model (install: python -m spacy download en_core_web_sm)
try:
    nlp = spacy.load("en_core_web_sm")
except:
    print("spaCy model not found. Install with: python -m spacy download en_core_web_sm")
    nlp = None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "OK", "message": "AI Engine is running"})

@app.route('/parse', methods=['POST'])
def parse_task():
    """Parse natural language text into task components"""
    data = request.json
    text = data.get('text', '')
    
    result = {
        'title': text,
        'description': '',
        'dueDate': None,
        'priority': 'medium',
        'category': 'other'
    }
    
    if nlp:
        doc = nlp(text)
        
        # Extract dates
        for ent in doc.ents:
            if ent.label_ == 'DATE':
                result['dueDate'] = ent.text
        
        # Extract priority keywords
        priority_keywords = {
            'urgent': 'urgent',
            'asap': 'urgent',
            'important': 'high',
            'critical': 'urgent',
            'low': 'low',
            'minor': 'low'
        }
        
        text_lower = text.lower()
        for keyword, priority in priority_keywords.items():
            if keyword in text_lower:
                result['priority'] = priority
                break
        
        # Basic category detection
        category_keywords = {
            'work': ['meeting', 'project', 'email', 'call', 'presentation'],
            'personal': ['birthday', 'family', 'friend'],
            'shopping': ['buy', 'purchase', 'shop', 'order'],
            'health': ['doctor', 'gym', 'exercise', 'medication'],
            'finance': ['pay', 'bill', 'invoice', 'bank']
        }
        
        for category, keywords in category_keywords.items():
            if any(kw in text_lower for kw in keywords):
                result['category'] = category
                break
    
    return jsonify(result)

@app.route('/predict-priority', methods=['POST'])
def predict_priority():
    """Predict task priority based on content and due date"""
    data = request.json
    title = data.get('title', '').lower()
    description = data.get('description', '').lower()
    due_date = data.get('dueDate')
    
    # Simple rule-based priority prediction
    priority = 'medium'
    
    urgent_keywords = ['urgent', 'asap', 'critical', 'emergency', 'immediately']
    high_keywords = ['important', 'soon', 'priority']
    low_keywords = ['maybe', 'sometime', 'eventually', 'when possible']
    
    combined_text = f"{title} {description}"
    
    if any(kw in combined_text for kw in urgent_keywords):
        priority = 'urgent'
    elif any(kw in combined_text for kw in high_keywords):
        priority = 'high'
    elif any(kw in combined_text for kw in low_keywords):
        priority = 'low'
    
    return jsonify({"priority": priority})

@app.route('/categorize', methods=['POST'])
def categorize():
    """Categorize task based on title and description"""
    data = request.json
    title = data.get('title', '').lower()
    description = data.get('description', '').lower()
    
    combined_text = f"{title} {description}"
    
    category_keywords = {
        'work': ['meeting', 'project', 'email', 'call', 'presentation', 'deadline', 'report'],
        'personal': ['birthday', 'family', 'friend', 'vacation', 'hobby'],
        'shopping': ['buy', 'purchase', 'shop', 'order', 'grocery'],
        'health': ['doctor', 'gym', 'exercise', 'medication', 'appointment', 'fitness'],
        'finance': ['pay', 'bill', 'invoice', 'bank', 'tax', 'budget']
    }
    
    category = 'other'
    max_matches = 0
    
    for cat, keywords in category_keywords.items():
        matches = sum(1 for kw in keywords if kw in combined_text)
        if matches > max_matches:
            max_matches = matches
            category = cat
    
    return jsonify({"category": category})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
