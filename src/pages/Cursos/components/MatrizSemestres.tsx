import { CaretRightOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Descriptions, Empty, Flex, Progress, Row, Tag, theme } from "antd";
import { CardDisciplina } from "../../../components/CardDisciplina";
import { Curso, MatrizCurricular } from "../Cursos";

interface MatrizSemestresProps {
  matriz: MatrizCurricular;
  curso: Curso;
}

export const MatrizSemestres = ({ matriz, curso }: MatrizSemestresProps) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorPrimaryBg,
    borderRadius: token.borderRadiusLG,
  };

  return matriz ? (
    <Flex gap="middle" vertical>
      <Descriptions
        layout="vertical"
        column={4}
        bordered
        items={[
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
            children: (
              <Flex vertical>
                <span>{matriz?.semestres?.length + " semestres"}</span>
                <Progress
                  steps={matriz?.numeroSemestres}
                  percent={Number(((matriz?.semestres?.length / matriz?.numeroSemestres) * 100).toFixed(2))}
                />
              </Flex>
            ),
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
        ]}
      />
      <Collapse
        bordered={false}
        style={{ background: "transparent" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={matriz?.semestres?.map((semestre) => ({
          key: semestre.id,
          label: <Tag color={token.colorPrimary}>{semestre.semestre + "º semestre"}</Tag>,
          children: semestre.disciplinas.length ? (
            <Row gutter={[32, 32]}>
              {semestre.disciplinas?.map((disciplina) => (
                <Col>
                  <CardDisciplina
                    disciplina={disciplina}
                    actions={[
                      <Button danger type="text">
                        <MinusCircleOutlined /> Remover
                      </Button>,
                    ]}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma disciplina no semestre</span>}>
              <Button type="primary" icon={<PlusCircleOutlined />}>
                Adicionar uma disciplina
              </Button>
            </Empty>
          ),
          style: panelStyle,
          extra: (
            <Button type="primary" icon={<EditOutlined />} onClick={(e) => e.stopPropagation()}>
              Editar semestre
            </Button>
          ),
        }))}
      />
    </Flex>
  ) : (
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}></Empty>
  );
};
