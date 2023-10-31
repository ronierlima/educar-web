import { LeftOutlined } from "@ant-design/icons";
import { Button, Tabs, message } from "antd";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Page } from "../../components/Page";
import { handleApiError } from "../../handleApiError";
import { Curso } from "./Cursos";
import { FormCadastroCurso } from "./components/FormCadastroCurso";

export const CursoEdicao = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState<Curso>();
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/cursos/${id}`);
      setCurso(response.data);
    } catch (error) {
      handleFetchCursosError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCursosError = (error: unknown) => {
    messageApi.open({
      type: "error",
      content: handleApiError(error as AxiosError),
    });
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <Page
      loading={loading}
      pageTitle={curso?.nome}
      pageExtra={
        <Button icon={<LeftOutlined />} danger onClick={() => navigate("/cursos")}>
          Cursos
        </Button>
      }
    >
      {contextHolder}

      <Tabs
        type="line"
        items={[
          {
            label: "Dados Gerais",
            children: <FormCadastroCurso curso={curso} loading={loading} buttonText="Atualizar" />,
          },
          { label: "Matriz" },
        ].map(({ label, children }, i) => ({
          label,
          key: i,
          children,
        }))}
      />
    </Page>
  );
};
