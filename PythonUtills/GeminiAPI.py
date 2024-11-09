import google.generativeai as genai
import os
from flask import Flask, request, jsonify
import json

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

    # Ensure language parameter is provided
    if not language:
        return jsonify({"error": "Language parameter is required"}), 400

    # Initialize the Gemini model
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    # Step 1: Retrieve the list of letters in the alphabet for the specified language
    initial_prompt = (
        f"List all letters in the alphabet for the {language} language, including any special or unique characters. "
        "Only return the letters as an array of strings in the native script."
    )
    initial_response = model.generate_content(initial_prompt)
    
    # Check if response is successful
    if not initial_response or not initial_response.text:
        return jsonify({"error": "Failed to retrieve alphabet letters"}), 500

    # Step 2: Retrieve pronunciation for each letter
    alphabet_letters = initial_response.text  # Assuming this comes as a JSON array of letters
    pronunciation_prompt = (
        f"Provide the pronunciation for each letter in the {language} alphabet, formatted as a JSON array where "
        f"each object contains 'letter' and its 'pronunciation' in Romanized format if needed. "
        "Limit each pronunciation to a maximum of two words. Only return the JSON data."
    )
    pronunciation_response = model.generate_content(pronunciation_prompt)

    # Check if pronunciation retrieval is successful
    if not pronunciation_response or not pronunciation_response.text:
        return jsonify({"error": "Failed to retrieve letter pronunciation"}), 500

    # Return the combined JSON response
    return jsonify({"characters": pronunciation_response.text})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
