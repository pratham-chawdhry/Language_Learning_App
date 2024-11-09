import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null || localStorage.getItem('jwtToken'));
  const [questionNumber, setQuestionNumber] = useState(0);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'english');

  const incrementQuestionNumber = () => setQuestionNumber(questionNumber + 1);

  // Function to store token
  const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
    setJwtToken(token );
  }

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  }

  // Function to clear token (for logout)
  const clearToken = () => setJwtToken(null);

  const endTest = async ({ noOfCorrectAnswers, noOfAttemptsForCorrectAnswer }) => {
    try {
      const response = await fetch('http://localhost:8080/question/Endtest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ NoofCorrectAnswers: 1, NoofAttemptsForCorrectAnswer: 2}),
      });

      if (!response.ok) {
        throw new Error('Failed to end test');
      }

      const data = await response.json();
      setResult(data);
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ jwtToken, storeToken, clearToken, questionNumber, incrementQuestionNumber, language, changeLanguage, endTest }}>
      {children}
    </AuthContext.Provider>
  );
};
