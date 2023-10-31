import {
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate, Tag, Typography, theme } from "antd";
import { getSigla, semestresParaAnos } from "../../../utils/curso";
import { Curso } from "../Cursos";
import { useNavigate } from "react-router-dom";

export interface CardCursoProps {
  curso: Curso;
}

const { useToken } = theme;

export function CardCurso({ curso }: CardCursoProps) {
  const { token } = useToken();
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      bodyStyle={{ height: 200 }}
      actions={[
        <SettingOutlined key="setting" />,
        <EllipsisOutlined key="ellipsis" />,
        <EditOutlined key="edit" onClick={() => navigate(`/cursos/${curso.id}`)} />,
      ]}
    >
      <Card.Meta
        avatar={<Avatar style={{ background: token.colorPrimary }}>{getSigla(curso?.nome)}</Avatar>}
        title={curso?.nome}
        description={<Rate value={5} />}
      />

      <Typography.Paragraph ellipsis={{ rows: 2 }}>{curso.descricao}</Typography.Paragraph>
      <Tag color="blue">
        <CalendarOutlined /> {semestresParaAnos(curso?.semestres)} anos
      </Tag>
      <Tag>
        <ClockCircleOutlined /> {curso?.cargaHoraria}H
      </Tag>
    </Card>
  );
}
