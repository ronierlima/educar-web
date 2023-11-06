import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { message } from "antd";
export interface User {
  id: number;
  nome: string;
  curso_id: number;
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
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("educar@token");
    const user = localStorage.getItem("educar@user");

    jwtVerificar(token);

    token && setToken(token);
    user && setUser(JSON.parse(user));
  }, []);

  const login = (user: User, authToken: string) => {
    setUser(user);
    localStorage.setItem("educar@user", JSON.stringify(user));
    setToken(authToken);
    localStorage.setItem("educar@token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("educar@token");
    localStorage.removeItem("educar@user");
    localStorage.removeItem("educar@perfil");

    navigate("/login");
  };

  const changeRole = (role: string) => {
    console.log(role);
    localStorage.setItem("educar@perfil", role.toString());

    switch (role) {
      case "ALUNO":
        navigate(`/cursos/${user?.curso_id}`);
        return;
      case "PROFESSOR":
        navigate(`/cursos/${user?.curso_id}`);
        return;
      case "COORDENADOR":
        navigate("/cursos");
        return;
      case "ADMIN":
        navigate("/usuarios");
        return;
    }
  };

  const getRole = () => {
    return localStorage.getItem("educar@perfil");
  };

  const jwtVerificar = (token: string | null) => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && currentTime > decodedToken.exp) {
          logout();
          message.error("Seu token expirou. Faça login novamente.");
        }
      } else {
        logout();
        message.error("Você não está autenticado. Faça login.");
      }
    } catch (error) {
      logout();
      message.error("Ocorreu um erro na verificação do token. Faça login novamente.");
    }
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, getRole, changeRole }}>{children}</UserContext.Provider>
  );
}
