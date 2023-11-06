import { Modal, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { Usuario } from "../Usuarios";
import { FormCadastroUsuarios } from "./FormCadastroUsuarios";

export interface ModalCadastroDisciplinasProps {
  usuario?: Usuario | null;
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroUsuarios({ usuario, open, close, refresh }: ModalCadastroDisciplinasProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const cadastrarUsuario = async (values: Usuario) => {
    setLoading(true);
    try {
      await ApiService.post("/usuarios", { ...values, papeis: values.papeis.map((value) => ({ id: value })) });

      message.success("cadastro realizado");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao cadastrar: ${error.message}` : "Erro desconhecido ao cadastrar o usuário.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const editarDisciplina = async (values: Usuario) => {
    setLoading(true);
    try {
      await ApiService.put(`/disciplinas/${usuario?.id}`, values);

      message.success("Edição concluída");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao editar: ${error.message}` : "Erro desconhecido ao editar a usuario.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      destroyOnClose
      title={usuario ? "Editar: " + usuario.nome : "Novo Usuario"}
      open={open}
      onCancel={close}
      footer={null}
    >
      <FormCadastroUsuarios
        usuario={usuario}
        buttonText={usuario ? "Editar" : "Cadastrar"}
        loading={loading}
        onFinish={usuario ? editarDisciplina : cadastrarUsuario}
      />
    </Modal>
  );
}
