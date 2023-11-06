import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Grid, Space, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { PaginationProps } from "antd/lib";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { ModalCadastroUsuarios } from "./components/ModalCadastroUsuarios";

const { useBreakpoint } = Grid;

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  papeis: number[];
}

const mapCargaHorariaToColor = (ch: number) => {
  if (ch < 64) {
    return "blue";
  } else if (ch >= 64 && ch <= 72) {
    return "green";
  }
  return "#f50";
};

const showTotal: PaginationProps["showTotal"] = (total) => `${total} usuarios`;

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState<Usuario | null>(null);
  const screens = useBreakpoint();

  const buscarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/usuarios");
      setUsuarios(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar os usuários.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const prepareUsuarioEdit = (disciplina: Usuario) => {
    setOpen(true);
    setUsuarioEdit(disciplina);
  };

  const columns: ColumnsType<Usuario> = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Carga Horária",
      dataIndex: "cargaHoraria",
      key: "cargaHoraria",
      responsive: ["md"],
      render: (ch) => <Tag color={mapCargaHorariaToColor(ch)}>{ch}H</Tag>,
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      responsive: ["lg"],
    },

    {
      title: "Ações",
      key: "action",
      render: (record) => (
        <Space size="small">
          <Button type="link" onClick={() => prepareUsuarioEdit(record)}>
            <EditOutlined key="edit" /> {screens.md && "editar"}
          </Button>

          <Button danger type="text">
            <DeleteOutlined key="delete" /> {screens.md && "apagar"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Page
      loading={loading}
      pageTitle="Usuários"
      pageExtra={
        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Novo Usuario
        </Button>
      }
    >
      <Table rowKey={({ id }) => id} columns={columns} dataSource={usuarios} pagination={{ showTotal }} />

      <ModalCadastroUsuarios
        usuario={usuarioEdit}
        open={open}
        close={() => {
          setUsuarioEdit(null);
          setOpen(false);
        }}
        refresh={buscarUsuarios}
      />
    </Page>
  );
};
