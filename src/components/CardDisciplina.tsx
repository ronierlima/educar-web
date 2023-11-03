import { ClockCircleOutlined, ReadOutlined } from "@ant-design/icons";
import { Card, Tag, theme } from "antd";
import { Disciplina } from "../pages/Disciplinas/Disciplinas";

interface CardDisciplinaProps {
  disciplina: Disciplina;
  actions?: Array<React.ReactNode>;
}

export const CardDisciplina = ({ disciplina, actions }: CardDisciplinaProps) => {
  const { token } = theme.useToken();
  return (
    <Card
      title={
        <>
          <ReadOutlined /> {disciplina.nome}
        </>
      }
      bordered={false}
      hoverable
      actions={actions}
    >
      <p>{disciplina.descricao}</p>
      <Tag icon={<ClockCircleOutlined />} color={token.colorPrimary}>
        {disciplina.cargaHoraria}H
      </Tag>
    </Card>
  );
};
