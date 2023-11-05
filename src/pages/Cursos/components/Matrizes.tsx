import { ApartmentOutlined, EyeOutlined, ReadOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Drawer, Empty, List, Row, Statistic } from "antd";
import { Curso, MatrizCurricular } from "./../Cursos";
import { useState } from "react";
import { MatrizSemestres } from "./MatrizSemestres";

interface MatrizesProps {
  curso?: Curso;
}
export const Matrizes = ({ curso }: MatrizesProps) => {
  const [matriz, setMatriz] = useState<MatrizCurricular>();
  const [open, setOpen] = useState<boolean>(false);

  return curso?.matrizes.length ? (
    <>
      <List
        grid={{ gutter: 16 }}
        dataSource={curso?.matrizes}
        renderItem={(matriz) => (
          <List.Item>
            <Badge.Ribbon text={matriz.atual ? "ATUAL" : "ANTERIOR"} color={matriz.atual ? "" : "red"}>
              <Card
                title={matriz?.descricao}
                actions={[
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => {
                      setMatriz(matriz);
                      setOpen(true);
                    }}
                  >
                    Ver detalhes
                  </Button>,
                ]}
                hoverable
              >
                <Row gutter={16}>
                  <Col lg={12} span={24}>
                    <Statistic title="Semestres" value={matriz?.semestres?.length} prefix={<ApartmentOutlined />} />
                  </Col>
                  <Col lg={12} span={24}>
                    <Statistic title="Disciplinas" value={matriz?.totalDisciplinas} prefix={<ReadOutlined />} />
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </List.Item>
        )}
      />
      {matriz && (
        <Drawer title={matriz?.descricao} width="80vw" placement="right" onClose={() => setOpen(false)} open={open}>
          <MatrizSemestres curso={curso} matriz={matriz} />
        </Drawer>
      )}
    </>
  ) : (
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}></Empty>
  );
};
