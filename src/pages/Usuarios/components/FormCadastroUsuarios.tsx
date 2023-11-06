import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Usuario } from "../Usuarios";
import { ApiService } from "../../../services/api";
import { useEffect, useState } from "react";
import { Curso } from "../../Cursos/Cursos";

export interface FormCadastroDisciplinaProps {
  usuario?: Usuario | null;
  loading: boolean;
  buttonText?: string;
  onFinish?: (values: Usuario) => Promise<void>;
}

export interface Papel {
  id: number;
  nome: string;
  descricao: string;
}

export function FormCadastroUsuarios({ usuario, loading, buttonText, onFinish }: FormCadastroDisciplinaProps) {
  const [papeis, setPapeis] = useState<Array<Papel>>();
  const [cursos, setCursos] = useState<Array<Curso>>();

  const fetchCursos = async () => {
    try {
      const response = await ApiService.get(`/cursos`);
      setCursos(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar os cursos.";

      message.error(errorMessage);
    }
  };

  const fetchPapeis = async () => {
    try {
      const response = await ApiService.get(`/usuarios/papeis`);
      setPapeis(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar os papeis.";

      message.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchPapeis();
    fetchCursos();
  }, []);

  return (
    <Form
      name="disciplina"
      layout="vertical"
      autoComplete="off"
      initialValues={usuario ? usuario : {}}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Nome" name="nome" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Senha" name="senha" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Curso" name="curso" rules={[{ required: true }]}>
            <Select>
              {cursos?.map((curso) => (
                <Select.Option value={curso.id}>{curso.nome}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Papeis" name="papeis" rules={[{ required: true }]}>
            <Select mode="multiple">
              {papeis?.map((papel) => (
                <Select.Option value={papel.id}>{papel.nome}</Select.Option>
              ))}
            </Select>
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
