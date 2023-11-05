import { LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Grid, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { Curso } from "./Cursos";
import { FormCadastroCurso } from "./components/FormCadastroCurso";
import { MatrizSemestres } from "./components/MatrizSemestres";
import { Matrizes } from "./components/Matrizes";
import { ModalCadastroMatriz } from "./components/ModalCadastroMatriz";
import { ModalCadastroSemestre } from "./components/ModalCadastroSemestre";

const { useBreakpoint } = Grid;

export const CursoEdicao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  const [curso, setCurso] = useState<Curso>();
  const [loading, setLoading] = useState(false);
  const [modalMatriz, setModalMatriz] = useState(false);
  const [modalSemestre, setModalSemestre] = useState(false);

  const currentTab = location.hash.slice(1) || "dadosGerais";

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get(`/cursos/${id}`);
      setCurso(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar o curso.";

      message.error(errorMessage);

      navigate("/cursos");
    } finally {
      setLoading(false);
    }
  };

  const updateCurso = async (values: Curso) => {
    setLoading(true);
    try {
      await ApiService.put(`/cursos/${id}`, values);
      fetchCursos();
      message.success("Curso atualizado com sucesso");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao editar: ${error.message}` : "Erro desconhecido ao editar o curso.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removerSemestre = async (matrizId: number, semestreId: number) => {
    setLoading(true);
    try {
      await ApiService.delete(`/matrizes/${matrizId}/semestres/${semestreId}`);
      message.success("Semestre removido com sucesso!");
      fetchCursos();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao remover: ${error.message}` : "Erro desconhecido ao remover o semestre.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const removerDisciplina = async (matrizId: number, semestreId: number, disciplinaId: number) => {
    setLoading(true);
    try {
      await ApiService.delete(`/matrizes/${matrizId}/semestres/${semestreId}/disciplinas/${disciplinaId}`);
      message.success("Disciplina removida com sucesso!");
      fetchCursos();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao remover: ${error.message}` : "Erro desconhecido ao remover a disciplina.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleTabChange = (activeKey: string) => {
    navigate(`${location.pathname}#${activeKey}`);
  };

  const tabBarExtraContent: { [key: string]: JSX.Element } = {
    matrizAtual: (
      <Button type="primary" onClick={() => setModalSemestre(true)} icon={<PlusCircleOutlined />}>
        {screens.xs ? null : "Novo Semestre"}
      </Button>
    ),
    matrizes: (
      <Button type="primary" onClick={() => setModalMatriz(true)} icon={<PlusCircleOutlined />}>
        {screens.xs ? null : "Nova matriz"}
      </Button>
    ),
  };

  return (
    <Page
      loading={loading}
      pageTitle={"Curso de " + curso?.nome}
      pageExtra={
        <Button icon={<LeftOutlined />} danger onClick={() => navigate("/cursos")}>
          Cursos
        </Button>
      }
    >
      {curso && (
        <>
          <Tabs
            tabBarExtraContent={tabBarExtraContent[currentTab]}
            type="card"
            activeKey={currentTab}
            onChange={handleTabChange}
            items={[
              {
                key: "dadosGerais",
                label: "Dados Gerais",
                children: (
                  <FormCadastroCurso curso={curso} loading={loading} onFinish={updateCurso} buttonText="Atualizar" />
                ),
              },
              curso?.matrizAtual && {
                key: "matrizAtual",
                label: "Matriz Atual",
                children: (
                  <MatrizSemestres
                    curso={curso}
                    matriz={curso?.matrizAtual}
                    refresh={fetchCursos}
                    removerSemestre={removerSemestre}
                    removerDisciplina={removerDisciplina}
                  />
                ),
              },
              {
                key: "matrizes",
                label: "Matrizes",
                children: <Matrizes curso={curso} />,
              },
            ]}
          />

          <ModalCadastroMatriz
            curso={curso}
            open={modalMatriz}
            close={() => setModalMatriz(false)}
            refresh={fetchCursos}
          />

          <ModalCadastroSemestre
            matriz={curso?.matrizAtual}
            curso={curso}
            open={modalSemestre}
            close={() => setModalSemestre(false)}
            refresh={fetchCursos}
          />
        </>
      )}
    </Page>
  );
};
