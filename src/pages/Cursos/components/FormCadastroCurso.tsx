import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Curso } from "../Cursos";

export interface FormCadastroCursoProps {
  curso?: Curso;
  loading: boolean;
  buttonText?: string;
  onFinish?: (values: Curso) => Promise<void>;
}

export function FormCadastroCurso({ curso, loading, buttonText, onFinish }: FormCadastroCursoProps) {
  return (
    <Form name="curso" layout="vertical" autoComplete="off" initialValues={curso} onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Titulação" name="titulacao" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="BACHARELADO">Bacharelado</Select.Option>
              <Select.Option value="TECNOLOGO">Tecnólogo</Select.Option>
              <Select.Option value="LICENCIATURA">Licenciatura</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Número de Semestres" name="semestres" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
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
