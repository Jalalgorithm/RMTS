// AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  role: string;
  // Add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    const decodedToken: { role: string } = jwtDecode(token) as {
      role: string;
    };
    setUser({ role: decodedToken.role });
  };

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
