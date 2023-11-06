import { Avatar, Button, Col, Form, Input, Modal, Row, Segmented } from "antd";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../components/Page";
import { Papel, useUser } from "../context/UserContext";
import { ApiService } from "../services/api";
import { SegmentedValue } from "antd/es/segmented";

export interface UserCrendentials {
  email: number;
  senha: string;
}

interface JwtUser {
  usuario_id: number;
  usuario_nome: string;
  roles: Array<string>;
}

export function Login() {
  const navigate = useNavigate();
  const { login, changeRole } = useUser();

  const [open, setOpen] = useState(false);
  const [perfis, setPerfis] = useState<string[]>([]);

  const onFinish = async (values: UserCrendentials) => {
    try {
      const response = await ApiService.post("/usuarios/login", values);

      const payload = (await jwtDecode(response?.data)) as JwtUser;

      const user = { id: payload.usuario_id, nome: payload.usuario_nome, roles: payload.roles };
      console.log(user);

      login(user, response?.data);

      if (user.roles.length > 1) {
        setPerfis(user.roles);
        setOpen(true);
        return;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePerfil = (perfil: string) => {
    console.log("1", perfil);

    perfil && changeRole(perfil);
    setOpen(false);
    navigate("/");
  };

  return (
    <Page showHeader={false}>
      <Row justify="center">
        <Col>
          <Form onFinish={onFinish} initialValues={{ email: "ronier.lim@gmail.com", senha: "123456" }}>
            <Row justify={"center"}>
              <Col>
                <h1>Login</h1>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item name="email">
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="senha">
                  <Input.Password placeholder={"Senha"} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item>
                  <Button block={true} type="primary" htmlType="submit">
                    Entrar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Modal title="Escolha o seu perfil" open={open} footer={null}>
        <Row justify="center">
          <Col>
            <Segmented
              onChange={(value) => handlePerfil(value.toString())}
              defaultValue=""
              options={perfis.map((perfil) => ({
                label: (
                  <div style={{ padding: 4 }}>
                    <Avatar style={{ backgroundColor: "#f56a00" }}>{perfil[0]}</Avatar>
                    <div>{perfil}</div>
                  </div>
                ),
                value: perfil,
              }))}
            />
          </Col>
        </Row>
      </Modal>
    </Page>
  );
}
