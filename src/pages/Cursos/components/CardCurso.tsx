import {
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Avatar, Button, Card, Rate, Tag, Typography, theme } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalDelete } from "../../../components/ModalDelete";
import { getSigla, semestresParaAnos } from "../../../utils/curso";
import { Curso } from "../Cursos";

export interface CardCursoProps {
  curso: Curso;
}

const { useToken } = theme;

export function CardCurso({ curso }: CardCursoProps) {
  const { token } = useToken();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    setIsModalOpen(true);
  };
  return (
    <Card
      hoverable
      bodyStyle={{ height: 200 }}
      actions={[
        <SettingOutlined key="setting" />,
        <Button type="link" onClick={() => navigate(`/cursos/${curso.id}`)}>
          <EditOutlined key="edit" />
        </Button>,
        <Button danger type="text" onClick={handleDelete}>
          <DeleteOutlined key="delete" />
        </Button>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar style={{ background: token.colorPrimary }}>{getSigla(curso?.nome)}</Avatar>}
        title={curso?.nome}
        description={<Rate value={5} />}
      />

      <Typography.Paragraph ellipsis={{ rows: 2 }}>{curso.descricao}</Typography.Paragraph>
      <Tag icon={<CalendarOutlined />} color="blue">
        {semestresParaAnos(curso?.semestres)} anos
      </Tag>
      <Tag icon={<ClockCircleOutlined />}>{curso?.cargaHoraria}H</Tag>

      <ModalDelete open={isModalOpen} text="este curso" onOk={() => {}} onCancel={() => setIsModalOpen(false)} />
    </Card>
  );
}
