import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cursos } from "./pages/Cursos/Cursos";
import { CursoEdicao } from "./pages/Cursos/CursoEdicao";
import { Disciplinas } from "./pages/Disciplinas/Disciplinas";
import { AccessDenied } from "./pages/AccessDenied";
import { Login } from "./pages/Login";
import { useUser } from "./context/UserContext";
import { Usuarios } from "./pages/Usuarios/Usuarios";
import { CursoMatriz } from "./pages/Cursos/CursoMatriz";

export function Router() {
  const { getRole } = useUser();

  const routes = () => {
    switch (getRole()) {
      case "ALUNO":
        return [{ path: "/cursos/:id", element: <CursoMatriz /> }];
      case "PROFESSOR":
        return [{ path: "/cursos/:id", element: <CursoMatriz /> }];
      case "COORDENADOR":
        return [
          { path: "/cursos", element: <Cursos /> },
          { path: "/cursos/:id", element: <CursoEdicao /> },
          { path: "/disciplinas", element: <Disciplinas /> },
        ];
      case "ADMIN":
        return [
          { path: "/usuarios", element: <Usuarios /> },
          { path: "/cursos", element: <Cursos /> },
          { path: "/cursos/:id", element: <CursoEdicao /> },
          { path: "/disciplinas", element: <Disciplinas /> },
        ];
    }

    return [];
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {routes().map(({ path, element }) => (
        <Route path={path} element={element} />
      ))}

      <Route path="/acesso-negado" element={<AccessDenied />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
