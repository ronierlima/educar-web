import { LeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { Curso } from "./Cursos";
import { FormCadastroCurso } from "./components/FormCadastroCurso";
import { MatrizSemestres } from "./components/MatrizSemestres";
import { Matrizes } from "./components/Matrizes";
import { ModalCadastroMatriz } from "./components/ModalCadastroMatriz";

export const CursoEdicao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [curso, setCurso] = useState<Curso>();
  const [loading, setLoading] = useState(false);
  const [modalMatriz, setModalMatriz] = useState(false);

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
      const response = await ApiService.put(`/cursos/${id}`, values);
      setCurso(response?.data);
      message.success("Curso atualizado com sucesso");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao editar: ${error.message}` : "Erro desconhecido ao editar o curso.";
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
      <Tabs
        tabBarExtraContent={
          <Button onClick={() => setModalMatriz(true)} icon={<PlusCircleOutlined />}>
            {currentTab == "matrizAtual" ? "Novo Semestre" : "Nova matriz"}
          </Button>
        }
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
          { key: "matrizAtual", label: "Matriz Atual", children: <MatrizSemestres matriz={curso?.matrizAtual} /> },
          {
            key: "matrizes",
            label: "Matrizes",
            children: <Matrizes curso={curso} />,
          },
        ].map(({ key, label, children }) => ({
          label,
          key,
          children,
        }))}
      />
      {curso && (
        <ModalCadastroMatriz
          curso={curso}
          open={modalMatriz}
          close={() => setModalMatriz(false)}
          refresh={fetchCursos}
        />
      )}
    </Page>
  );
};
