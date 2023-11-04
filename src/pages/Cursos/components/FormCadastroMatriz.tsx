import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Curso } from "../Cursos";

export interface FormCadastroMatrizProps {
  curso: Curso;
  loading: boolean;
  buttonText?: string;
  onFinish?: (values: Curso) => Promise<void>;
}

export function FormCadastroMatriz({ loading, buttonText, onFinish }: FormCadastroMatrizProps) {
  return (
    <Form name="matriz" layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Descrição da matriz" name="descricao" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Matriz atual?" name="atual" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={true}>Sim</Select.Option>
              <Select.Option value={false}>Não</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Número de Semestres" name="numeroSemestres" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Carga horária" name="cargaHoraria" rules={[{ required: true }]}>
            <InputNumber style={{ width: "100%" }} />
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
