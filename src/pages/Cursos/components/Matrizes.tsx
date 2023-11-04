import { ApartmentOutlined, EyeOutlined, ReadOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Col, Empty, List, Row, Statistic } from "antd";
import { Curso } from "./../Cursos";

interface MatrizesProps {
  curso?: Curso;
}
export const Matrizes = ({ curso }: MatrizesProps) => {
  return curso?.matrizes.length ? (
    <List
      grid={{ gutter: 16 }}
      dataSource={curso?.matrizes}
      renderItem={(matriz) => (
        <List.Item>
          <Badge.Ribbon text={matriz.atual ? "ATUAL" : "ANTERIOR"} color={matriz.atual ? "" : "red"}>
            <Card
              style={{ width: 300 }}
              title={matriz?.descricao}
              actions={[
                <Button type="primary" icon={<EyeOutlined />}>
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
  ) : (
    <Empty imageStyle={{ height: 128 }} description={<span>Nenhuma matriz cadastrada</span>}></Empty>
  );
};
