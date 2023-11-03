import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  return (
    <header style={{ display: "flex", alignItems: "center", background: "#ffffff" }}>
      <Avatar size={32}>T</Avatar>

      <Menu
        style={{ minWidth: 0, flex: "auto", display: "flex", justifyContent: "flex-end" }}
        onClick={({ key }) => navigate(key)}
        mode="horizontal"
        items={[
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
            label: "Perfil",
            key: "/perfil",
            icon: <UserOutlined />,
          },
        ]}
      />
    </header>
  );
}
