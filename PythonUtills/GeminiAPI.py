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
    prompt = f"Create a {question_type} language learning question in {language}. and give all in json format mapping . json should be structured properly"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return jsonify({"question": response.text})

@app.route('/generate_characters', methods=['GET'])
def generate_characters():
    # Get the language parameter
    language = request.args.get('language')

    # Generate content from Gemini API to get characters
    prompt = f"Retrieve the complete alphabets of {language}, along with each letter's pronunciation. Please return the data as a JSON array where each object includes the letter and its pronunciation. Format each entry as: letter and pronounciation Repeat for all letters in the {language} alphabet. just return the json format no notes section and pronunciation limit to max 2 words"
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return jsonify({"characters": response.text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
