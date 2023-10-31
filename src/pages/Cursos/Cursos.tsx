import React, { useEffect, useState } from "react";
import { Button, Col, Row, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios, { AxiosError } from "axios";
import { Page } from "../../components/Page";
import { handleApiError } from "../../handleApiError";
import { CardCurso } from "./components/CardCurso";
import { ModalCadastroCursos } from "./components/ModalCadastroCursos";

export interface Curso {
  id: number;
  nome: string;
  semestres: number;
  cargaHoraria: number;
  descricao: string;
}

export const Cursos = () => {
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/cursos");
      setCursos(response.data);
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
      pageTitle="Cursos"
      pageExtra={
        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Novo Curso
        </Button>
      }
    >
      {contextHolder}
      <Row gutter={[32, 32]}>
        {cursos.map((curso) => (
          <Col span={8} key={curso?.id}>
            <CardCurso curso={curso} />
          </Col>
        ))}
      </Row>

      <ModalCadastroCursos open={open} close={() => setOpen(false)} refresh={fetchCursos} />
    </Page>
  );
};
