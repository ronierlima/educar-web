import { ReactNode, createContext, useContext, useState } from "react";

export interface User {
  id: number;
  nome: string;
  roles: string[];
}

export enum Papel {
  ALUNO,
  PROFESSOR,
  COORDENADOR,
  ADMIN,
}

interface UserContextType {
  user: User | null;
  token: string | null;
  login: (user: User, authToken: string) => void;
  logout: () => void;
  changeRole: (role: string) => void;
  getRole: () => string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (user: User, authToken: string) => {
    setUser(user);
    localStorage.setItem("educar@user", JSON.stringify(user));
    setToken(authToken);
    localStorage.setItem("educar@token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const changeRole = (role: string) => {
    console.log(role);
    localStorage.setItem("educar@perfil", role.toString());
  };

  const getRole = () => {
    return localStorage.getItem("educar@perfil");
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, getRole, changeRole }}>{children}</UserContext.Provider>
  );
}
