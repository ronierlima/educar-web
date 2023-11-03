import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Grid, Space, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { PaginationProps } from "antd/lib";
import { useEffect, useState } from "react";
import { Page } from "../../components/Page";
import { ApiService } from "../../services/api";
import { ModalCadastroDisciplinas } from "./components/ModalCadastroDisciplinas";

const { useBreakpoint } = Grid;

export interface Disciplina {
  id: number;
  nome: string;
  cargaHoraria: number;
  descricao: string;
}

const mapCargaHorariaToColor = (ch: number) => {
  if (ch < 64) {
    return "blue";
  } else if (ch >= 64 && ch <= 72) {
    return "green";
  }
  return "#f50";
};

const showTotal: PaginationProps["showTotal"] = (total) => `${total} disciplinas`;

export const Disciplinas = () => {
  const [disciplinas, setDisciplinas] = useState<Array<Disciplina>>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disciplinaEdit, setDisciplinaEdit] = useState<Disciplina | undefined>();
  const screens = useBreakpoint();

  const fetchDisciplinas = async () => {
    setLoading(true);
    try {
      const response = await ApiService.get("/disciplinas");
      setDisciplinas(response?.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao buscar: ${error.message}` : "Erro desconhecido ao buscar as disciplinas.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisciplinas();
  }, []);

  const prepareDisciplinaEdit = (disciplina: Disciplina) => {
    setOpen(true);
    setDisciplinaEdit(disciplina);
  };

  const columns: ColumnsType<Disciplina> = [
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
          <Button type="link" onClick={() => prepareDisciplinaEdit(record)}>
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
      pageTitle="Disciplinas"
      pageExtra={
        <Button icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Nova Disciplina
        </Button>
      }
    >
      <Table rowKey={({ id }) => id} columns={columns} dataSource={disciplinas} pagination={{ showTotal }} />

      <ModalCadastroDisciplinas
        disciplina={disciplinaEdit}
        open={open}
        close={() => setOpen(false)}
        refresh={fetchDisciplinas}
      />
    </Page>
  );
};
