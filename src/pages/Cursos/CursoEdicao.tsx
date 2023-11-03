import { LeftOutlined } from "@ant-design/icons";
import { Button, Collapse, CollapseProps, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { Curso } from "./Cursos";
import { FormCadastroCurso } from "./components/FormCadastroCurso";

const MatrizSemestres = () => {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Semestre 1",
      children: <p>ter</p>,
    },
    {
      key: "2",
      label: "Semestre 2",
      children: <p>ter</p>,
    },
    {
      key: "3",
      label: "Semestre 3",
      children: <p>ter</p>,
    },
  ];
  return (
    <div>
      {" "}
      <Collapse items={items} defaultActiveKey={["1"]} />{" "}
    </div>
  );
};

export const CursoEdicao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
        type="line"
        items={[
          {
            label: "Dados Gerais",
            children: (
              <FormCadastroCurso curso={curso} loading={loading} onFinish={updateCurso} buttonText="Atualizar" />
            ),
          },
          { label: "Matriz", children: <MatrizSemestres /> },
        ].map(({ label, children }) => ({
          label,
          key: label,
          children,
        }))}
      />
    </Page>
  );
};
