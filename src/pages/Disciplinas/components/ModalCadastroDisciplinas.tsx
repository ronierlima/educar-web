import { Modal, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { Disciplina } from "../Disciplinas";
import { FormCadastroCurso } from "./FormCadastroDisciplina";

export interface ModalCadastroDisciplinasProps {
  disciplina?: Disciplina | undefined;
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroDisciplinas({ disciplina, open, close, refresh }: ModalCadastroDisciplinasProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const cadastrarDisciplina = async (values: Disciplina) => {
    setLoading(true);
    try {
      await ApiService.post("/disciplinas", values);

      message.success("cadastro realizado");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao cadastrar: ${error.message}` : "Erro desconhecido ao cadastrar a disciplina.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={disciplina ? "Editar: " + disciplina.nome : "Nova Disciplina"}
      open={open}
      onCancel={close}
      footer={null}
    >
      <FormCadastroCurso disciplina={disciplina} loading={loading} onFinish={cadastrarDisciplina} />
    </Modal>
  );
}
