import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cursos } from "./pages/Cursos/Cursos";
import { CursoEdicao } from "./pages/Cursos/CursoEdicao";
import { Disciplinas } from "./pages/Disciplinas/Disciplinas";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Cursos />} />

      <Route path="/cursos" element={<Cursos />} />
      <Route path="/cursos/:id" element={<CursoEdicao />} />

      <Route path="/disciplinas" element={<Disciplinas />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
