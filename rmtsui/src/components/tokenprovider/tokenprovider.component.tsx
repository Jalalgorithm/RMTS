import React, { createContext, useState, useContext, ReactNode } from "react";
import { redirect, useNavigate } from "react-router-dom";

interface TokenContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  clearToken: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const redirect = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  const clearToken = () => {
    setToken(null);

    redirect("/home");
  };
  return (
    <TokenContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
