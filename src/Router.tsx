import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cursos } from "./pages/Cursos/Cursos";
import { CursoEdicao } from "./pages/Cursos/CursoEdicao";
import { Disciplinas } from "./pages/Disciplinas/Disciplinas";
import { AccessDenied } from "./pages/AccessDenied";
import { Login } from "./pages/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Cursos />} />

      <Route path="/login" element={<Login />} />

      <Route path="/acesso-negado" element={<AccessDenied />} />

      <Route path="/cursos" element={<Cursos />} />
      <Route path="/cursos/:id" element={<CursoEdicao />} />

      <Route path="/disciplinas" element={<Disciplinas />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
