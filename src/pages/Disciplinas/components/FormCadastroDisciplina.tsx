import { Button, Col, Form, Input, InputNumber, Row } from "antd";
import { Disciplina } from "../Disciplinas";

export interface FormCadastroDisciplinaProps {
  disciplina?: Disciplina;
  loading: boolean;
  buttonText?: string;
  onFinish?: (values: Disciplina) => Promise<void>;
}

export function FormCadastroCurso({ disciplina, loading, buttonText, onFinish }: FormCadastroDisciplinaProps) {
  return (
    <Form name="disciplina" layout="vertical" autoComplete="off" initialValues={disciplina} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Carga horária" name="cargaHoraria" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Descrição" name="descricao">
            <Input.TextArea rows={8} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button loading={loading} htmlType="submit" type="primary">
            {buttonText || "Cadastrar"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
