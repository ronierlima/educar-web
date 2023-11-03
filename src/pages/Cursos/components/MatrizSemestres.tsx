import { CaretRightOutlined, EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Empty, Flex, Row, Tag, theme } from "antd";
import { CardDisciplina } from "../../../components/CardDisciplina";
import { MatrizCurricular } from "../Cursos";

interface MatrizSemestresProps {
  matriz: MatrizCurricular | undefined;
}

export const MatrizSemestres = ({ matriz }: MatrizSemestresProps) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorBgBase,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return matriz ? (
    <Flex gap="middle" vertical>
      <Collapse
        bordered={false}
        style={{ background: "transparent" }}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={matriz?.semestres.map((semestre) => ({
          key: semestre.id,
          label: <Tag color={token.colorPrimary}>{semestre.semestre + "º semestre"}</Tag>,
          children: semestre.disciplinas.length ? (
            <Row gutter={[32, 32]}>
              {semestre.disciplinas.map((disciplina) => (
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
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}>
      <Button type="primary">Criar agora</Button>
    </Empty>
  );
};
