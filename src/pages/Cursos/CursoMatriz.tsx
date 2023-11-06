import { message } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { Curso } from "./Cursos";
import { MatrizSemestres } from "./components/MatrizSemestres";

export const CursoMatriz = () => {
  const { id } = useParams();

  const [curso, setCurso] = useState<Curso>();
  const [loading, setLoading] = useState(false);

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/cursos/${id}`);
      setCurso(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar o curso.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <Page loading={loading} pageTitle={"Curso de " + curso?.nome}>
      {curso && <MatrizSemestres curso={curso} matriz={curso?.matrizAtual} />}
    </Page>
  );
};
