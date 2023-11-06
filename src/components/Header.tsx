import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function Header() {
  const navigate = useNavigate();
  const { getRole } = useUser();

  const getMenu = () => {
    switch (getRole()) {
      case "ALUNO":
        return [
          {
            label: "Curso",
            key: "/cursos",
            icon: <BookOutlined />,
          },
        ];

      case "PROFESSOR":
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
    }

    return [];
  };
  return (
    <header style={{ display: "flex", alignItems: "center", background: "#ffffff" }}>
      <Avatar size={32}>T</Avatar>

      <Menu
        style={{ minWidth: 0, flex: "auto", display: "flex", justifyContent: "flex-end" }}
        onClick={({ key }) => navigate(key)}
        mode="horizontal"
        items={[
          ...getMenu(),
          {
            label: "Perfil",
            key: "/perfil",
            icon: <UserOutlined />,
          },
        ]}
      />
    </header>
  );
}
