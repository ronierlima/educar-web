import { Flex, Progress } from "antd";

interface EscalaProps {
  atual: number;
  total: number;
  texto: string;
}

export function Escala({ atual = 0, total = 0, texto = "" }: EscalaProps) {
  const percent = Number(((atual / total) * 100).toFixed(2));

  return (
    <Flex vertical>
      <span>{`${atual} ${texto}`}</span>
      <Progress steps={total} percent={percent} />
    </Flex>
  );
}
