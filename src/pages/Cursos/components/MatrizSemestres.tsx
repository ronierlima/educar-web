import { CaretRightOutlined, DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Descriptions, Empty, Flex, Grid, Progress, Row, Space, Tag, theme } from "antd";
import { useState } from "react";
import { CardDisciplina } from "../../../components/CardDisciplina";
import { Escala } from "../../../components/Escala";
import { ModalDelete } from "../../../components/ModalDelete";
import { Curso, MatrizCurricular } from "../Cursos";

interface MatrizSemestresProps {
  matriz: MatrizCurricular;
  curso: Curso;
  removerSemestre?: (matrizId: number, semestreId: number) => void;
  removerDisciplina?: (matrizId: number, semestreId: number, disciplinaId: number) => void;
}

const { useBreakpoint } = Grid;

export const MatrizSemestres = ({ matriz, curso, removerDisciplina, removerSemestre }: MatrizSemestresProps) => {
  const { token } = theme.useToken();
  const screens = useBreakpoint();

  const [isModalOpenSemestre, setIsModalOpenSemestre] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [semestreId, setSemestreId] = useState<number>();
  const [disciplinaId, setDisciplinaId] = useState<number>();

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
                  removerDisciplina && (
                    <Button
                      danger
                      type="text"
                      onClick={() => {
                        setIsModalOpen(true);
                        setSemestreId(semestre.id);
                        setDisciplinaId(disciplina.id);
                      }}
                    >
                      <MinusCircleOutlined /> Remover
                    </Button>
                  ),
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
        <Space>
          {removerDisciplina && (
            <Button type="dashed" icon={<PlusCircleOutlined />} onClick={(e) => e.stopPropagation()}>
              {screens.xs ? null : "Nova disciplina"}
            </Button>
          )}

          {removerSemestre && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpenSemestre(true);
                setSemestreId(semestre.id);
              }}
            >
              {screens.xs ? null : "Remover Semestre"}
            </Button>
          )}
        </Space>
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
      {removerDisciplina && (
        <ModalDelete
          open={isModalOpen}
          text="esta disciplina"
          onOk={() => semestreId && disciplinaId && removerDisciplina(matriz.id, semestreId, disciplinaId)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
      {removerSemestre && (
        <ModalDelete
          open={isModalOpenSemestre}
          text="este semestre"
          onOk={() => semestreId && removerSemestre(matriz.id, semestreId)}
          onCancel={() => setIsModalOpenSemestre(false)}
        />
      )}
    </Flex>
  ) : (
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}></Empty>
  );
};
