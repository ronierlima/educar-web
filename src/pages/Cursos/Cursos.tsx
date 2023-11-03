import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { CardCurso } from "../../components/CardCurso";
import { ModalCadastroCursos } from "./components/ModalCadastroCursos";
import { Disciplina } from "../Disciplinas/Disciplinas";

export interface Semestre {
  id: number;
  semestre: number;
  disciplinas: Array<Disciplina>;
}
export interface MatrizCurricular {
  id: number;
  descricao: string;
  atual: boolean;
  totalDisciplinas: number;
  semestres: Array<Semestre>;
}

export interface Curso {
  id: number;
  nome: string;
  semestres: number;
  cargaHoraria: number;
  descricao: string;
  matrizAtual: MatrizCurricular;
  matrizes: Array<MatrizCurricular>;
}

export const Cursos = () => {
  const [cursos, setCursos] = useState<Array<Curso>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCursos = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/cursos");
      setCursos(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar os cursos.";

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
      pageTitle="Cursos"
      pageExtra={
        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Novo Curso
        </Button>
      }
    >
      <Row gutter={[32, 32]}>
        {cursos.map((curso) => (
          <Col lg={8} md={12} sm={24} key={curso?.id}>
            <CardCurso curso={curso} />
          </Col>
        ))}
      </Row>

      <ModalCadastroCursos open={open} close={() => setOpen(false)} refresh={fetchCursos} />
    </Page>
  );
};
