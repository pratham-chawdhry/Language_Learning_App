import google.generativeai as genai
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set up API key and initialize Gemini
os.environ["API_KEY"] = "AIzaSyBZTAdmQ-cAi0wKD_z9hvSt_r5qjgm13lY"
genai.configure(api_key=os.environ["API_KEY"])

@app.route('/generate_question', methods=['GET'])
def generate_question():
    # Get query parameters
    question_type = request.args.get('questionType')
    language = request.args.get('language')

    # Generate content from Gemini API
    prompt = f"Create a {question_type} language learning question in {language}."
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return jsonify({"question": response.text})

@app.route('/generate_characters', methods=['GET'])
def generate_characters():
    # Get the language parameter
    language = request.args.get('language')

    # Generate content from Gemini API to get characters
    prompt = f"give number of alphabets in {language} language. give pronouqciation of each alphabet. in json format mapping"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return jsonify({"characters": response.text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
