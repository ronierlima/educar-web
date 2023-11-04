import { Button, Col, Flex, Form, Row, Select, Steps } from "antd";
import { Curso, MatrizCurricular } from "../Cursos";

export interface FormCadastroSemestreProps {
  curso: Curso;
  matriz: MatrizCurricular;
  loading: boolean;
  buttonText?: string;
  onFinish?: (values: Curso) => Promise<void>;
}

export function FormCadastroSemestre({
  curso,
  matriz,
  loading,
  buttonText = "Cadastrar",
  onFinish,
}: FormCadastroSemestreProps) {
  const steps = Array.from({ length: curso.semestres }, (_, i) => i + 1);

  const isSemestreInMatriz = (step: number) => matriz?.semestres?.some((semestre) => semestre?.semestre === step);

  return (
    <Form name="matriz" layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Flex justify="center">
            <Steps
              style={{ marginTop: 8 }}
              type="inline"
              items={steps.map((step) => ({
                title: step.toString(),
                status: isSemestreInMatriz(step) ? "process" : "error",
              }))}
            />
          </Flex>
        </Col>
        <Col span={24}>
          <Form.Item label="Número do Semestre" name="semestre" rules={[{ required: true }]}>
            <Select>
              {steps?.map((step) => (
                <Select.Option disabled={isSemestreInMatriz(step)} value={true} key={step}>
                  {step}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button loading={loading} htmlType="submit" type="primary">
            {buttonText}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
