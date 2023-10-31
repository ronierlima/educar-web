import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Cursos } from "./pages/Cursos/Cursos";
import { CursoEdicao } from "./pages/Cursos/CursoEdicao";

function App() {
  return (
    <Routes>
      <Route path="/cursos" element={<Cursos />} />

      <Route path="/cursos/:id" element={<CursoEdicao />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
