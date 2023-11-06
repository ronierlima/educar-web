import { Col, Row, Select, Spin, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { useEffect } from "react";
import { Disciplina } from "../../Disciplinas/Disciplinas";
import { CardDisciplina } from "../../../components/CardDisciplina";
import { Semestre } from "../Cursos";

interface FormEditarSemestreProps {
  semestre: Semestre;
  setSemestre: React.Dispatch<React.SetStateAction<Semestre | undefined>>;
}

export const FormEditarSemestre = ({ semestre, setSemestre }: FormEditarSemestreProps) => {
  const [disciplinas, setDisciplinas] = useState<Array<Disciplina>>([]);
  const [disciplinasSelected, setDisciplinasSelected] = useState<Array<number>>(
    semestre.disciplinas.map(({ id }) => id)
  );
  const [loading, setLoading] = useState(false);

  const fetchDisciplinas = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/disciplinas");
      setDisciplinas(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar as disciplinas.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const handleChange = (values: number[]) => {
    setDisciplinasSelected(values);
    setSemestre({ ...semestre, disciplinas: disciplinas?.filter(({ id }) => values.includes(id)) });
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={[32, 32]}>
        
        <Col span="24">
          <Select
            mode="multiple"
            allowClear
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
            }
            value={disciplinasSelected}
            style={{ width: "100%" }}
            placeholder="Escolha disciplinas"
            onChange={handleChange}
            options={disciplinas?.map((disciplina) => ({
              label: `${disciplina.nome} - ${disciplina.cargaHoraria}H`,
              value: disciplina.id,
            }))}
          />
        </Col>

        {disciplinas
          ?.filter(({ id }) => disciplinasSelected.includes(id))
          ?.map((disciplina) => (
            <Col md={12} span={24}>
              <CardDisciplina disciplina={disciplina} key={disciplina.id} />
            </Col>
          ))}
      </Row>
    </Spin>
  );
};
