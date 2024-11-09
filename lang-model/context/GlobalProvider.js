import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(null);

  // Function to store token
  const storeToken = (token) => setJwtToken(token);

  // Function to clear token (for logout)
  const clearToken = () => setJwtToken(null);

  return (
    <AuthContext.Provider value={{ jwtToken, storeToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};
