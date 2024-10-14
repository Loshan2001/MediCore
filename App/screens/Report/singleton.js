import React, { createContext, useState, useMemo } from 'react';

// Create the AuthContext
export const AuthContex = createContext();

// Singleton instance holder
let instance = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Method to handle sign-in and save user data in state
  const signIn = ({ id, username, token }) => {
    setUser({ id, username, token });
  };

  // Method to handle sign-out
  const signOut = () => {
    setUser(null);
  };

  // Memoize context value to optimize performance (prevents unnecessary re-renders)
  const contextValue = useMemo(() => ({
    user,
    signIn,
    signOut,
  }), [user]);

  // Singleton pattern for AuthProvider
  if (!instance) {
    instance = contextValue;
  }

  return (
    <AuthContex.Provider value={instance}>
      {children}
    </AuthContex.Provider>
  );
};

// Function to access the AuthContext (enforces singleton use)
export const useAuth = () => {
  if (!instance) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return instance;
};
