import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Header() {
  const navigate = useNavigate();
  const { getRole, user, logout } = useUser();

  const getMenu = () => {
    switch (getRole()) {
      case "ALUNO":
        return [
          {
            label: "Curso",
            key: "/cursos/" + user?.curso_id,
            icon: <BookOutlined />,
          },
        ];

      case "PROFESSOR":
        return [
          {
            label: "Curso",
            key: "/cursos/" + user?.curso_id,
            icon: <BookOutlined />,
          },
        ];
      case "COORDENADOR":
        return [
          {
            label: "Cursos",
            key: "/cursos",
            icon: <BookOutlined />,
          },
          {
            label: "Disciplinas",
            key: "/disciplinas",
            icon: <ReadOutlined />,
          },
        ];
      case "ADMIN":
        return [
          {
            label: "Cursos",
            key: "/cursos",
            icon: <BookOutlined />,
          },
          {
            label: "Disciplinas",
            key: "/disciplinas",
            icon: <ReadOutlined />,
          },
          {
            label: "Usuários",
            key: "/usuarios",
            icon: <UserOutlined />,
          },
        ];
    }

    return [];
  };
  return (
    <header style={{ display: "flex", alignItems: "center", background: "#ffffff" }}>
      <Avatar size={32}>{user?.nome[0]}</Avatar>

      <Menu
        style={{ minWidth: 0, flex: "auto", display: "flex", justifyContent: "flex-end" }}
        onClick={({ key }) => {
          if (key == "logout") {
            logout();
          } else {
            navigate(key);
          }
        }}
        mode="horizontal"
        items={[
          ...getMenu(),
          {
            label: "Sair",
            key: "logout",
            icon: <UserOutlined />,
          },
        ]}
      />
    </header>
  );
}
