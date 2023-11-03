import { Modal, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { Curso } from "../Cursos";
import { FormCadastroCurso } from "./FormCadastroCurso";

export interface ModalCadastroCursosProps {
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroCursos({ open, close, refresh }: ModalCadastroCursosProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const cadastrarCurso = async (values: Curso) => {
    setLoading(true);
    try {
      await ApiService.post("/cursos", values);

      message.success("cadastro realizado");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao cadastrar: ${error.message}` : "Erro desconhecido ao cadastrar o curso.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal destroyOnClose title="Novo Curso" open={open} onCancel={close} footer={null}>
      <FormCadastroCurso loading={loading} onFinish={cadastrarCurso} />
    </Modal>
  );
}
