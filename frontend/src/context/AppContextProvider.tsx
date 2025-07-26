import React from "react";

const AppContext = React.createContext({});
const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider };