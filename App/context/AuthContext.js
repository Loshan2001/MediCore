// import React, { createContext, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const signIn = ({ username, password }) => {
//     setUser({ username, name: 'T.C. Herath' });
//   };

//   return (
//     <AuthContext.Provider value={{ user, signIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

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

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
