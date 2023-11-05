import { CalendarOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Rate, Tag, Typography, theme } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Curso } from "../pages/Cursos/Cursos";
import { getSigla, semestresParaAnos } from "../utils/curso";
import { ModalDelete } from "./ModalDelete";

export interface CardCursoProps {
  curso: Curso;
  removeCurso: (cursoId: number) => void;
}

const { useToken } = theme;

export function CardCurso({ curso, removeCurso }: CardCursoProps) {
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

      <ModalDelete
        open={isModalOpen}
        text="este curso"
        onOk={() => removeCurso(curso.id)}
        onCancel={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
