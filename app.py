from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()


app = Flask(__name__)
CORS(app)

# Telegram configuration
TELEGRAM_BOT_TOKEN = os.getenv('tele_api')
TELEGRAM_CHAT_ID = os.getenv('tele_chat_id')

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/contact.html')
def contact():
    return send_from_directory('.', 'contact.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['name', 'email', 'subject', 'message']):
            return jsonify({'error': 'All fields are required'}), 400
        
        name = data['name']
        email = data['email']
        subject = data['subject']
        message = data['message']
        
        # Format message for Telegram
        telegram_message = f"""🔔 *New Contact Form Submission*

👤 *Name:* {name}
📧 *Email:* {email}
📋 *Subject:* {subject}

💬 *Message:*
{message}

---
Sent from: Portfolio Website
Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"""
        
        # Send to Telegram
        telegram_url = f'https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage'
        
        response = requests.post(telegram_url, json={
            'chat_id': TELEGRAM_CHAT_ID,
            'text': telegram_message,
            'parse_mode': 'Markdown'
        })
        
        if response.status_code == 200:
            return jsonify({
                'success': True,
                'message': 'Message sent successfully!'
            })
        else:
            print(f"Telegram API error: {response.text}")
            return jsonify({
                'error': 'Failed to send message to Telegram'
            }), 500
            
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            'error': 'Failed to send message. Please try again.'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
