import { CaretRightOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Descriptions, Empty, Flex, Progress, Row, Tag, theme } from "antd";
import { CardDisciplina } from "../../../components/CardDisciplina";
import { Escala } from "../../../components/Escala";
import { Curso, MatrizCurricular } from "../Cursos";

interface MatrizSemestresProps {
  matriz: MatrizCurricular;
  curso: Curso;
  removerDisciplina: (matrizId: number, semestreId: number, disciplinaId: number) => void;
}

export const MatrizSemestres = ({ matriz, curso, removerDisciplina }: MatrizSemestresProps) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorPrimaryBg,
    borderRadius: token.borderRadiusLG,
  };

  const descriptionsItems = [
    {
      key: "1",
      label: "Matriz Atual",
      children: matriz?.descricao,
    },
    {
      key: "2",
      label: "Total de Semestres",
      children: matriz?.numeroSemestres + " semestres",
    },
    {
      key: "3",
      label: "Semestres cadastrados",
      children: <Escala texto="semestres" atual={matriz?.semestres?.length} total={matriz?.numeroSemestres} />,
    },
    {
      key: "4",
      label: "Disciplinas cadastradas",
      children: (
        <Flex vertical>
          <span>{matriz?.totalDisciplinas + " disciplinas"}</span>
          <Progress percent={Number(((matriz?.totalCargaHoraria / curso?.cargaHoraria) * 100).toFixed(2))} />
        </Flex>
      ),
    },
  ];

  const getItemsColapse = () => {
    return matriz?.semestres?.map((semestre) => ({
      key: semestre.id,
      label: <Tag color={token.colorPrimary}>{semestre.semestre + "º semestre"}</Tag>,
      children: semestre.disciplinas.length ? (
        <Row gutter={[32, 32]}>
          {semestre.disciplinas?.map((disciplina) => (
            <Col lg={8} md={12} sm={24} key={disciplina.id}>
              <CardDisciplina
                disciplina={disciplina}
                actions={[
                  <Button danger type="text" onClick={() => removerDisciplina(matriz.id, semestre.id, disciplina.id)}>
                    <MinusCircleOutlined /> Remover
                  </Button>,
                ]}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma disciplina no semestre</span>}></Empty>
      ),
      style: panelStyle,
      extra: (
        <Button type="primary" icon={<PlusCircleOutlined />} onClick={(e) => e.stopPropagation()}>
          Nova disciplina
        </Button>
      ),
    }));
  };

  return matriz ? (
    <Flex gap="middle" vertical>
      <Descriptions
        layout="vertical"
        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
        bordered
        items={descriptionsItems}
      />
      <Collapse
        bordered={false}
        style={{ background: "transparent" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={getItemsColapse()}
      />
    </Flex>
  ) : (
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}></Empty>
  );
};
