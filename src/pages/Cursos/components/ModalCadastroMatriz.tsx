import { Modal, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { Curso } from "../Cursos";
import { FormCadastroMatriz } from "./FormCadastroMatriz";

export interface ModalCadastroMatrizProps {
  curso: Curso;
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroMatriz({ curso, open, close, refresh }: ModalCadastroMatrizProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const cadastrarMatriz = async (values: Curso) => {
    setLoading(true);
    try {
      await ApiService.post(`/cursos/${curso?.id}/matrizes`, values);

      message.success("cadastro realizado");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao cadastrar: ${error.message}` : "Erro desconhecido ao cadastrar a matriz.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal destroyOnClose title="Nova Matriz Curricular" open={open} onCancel={close} footer={null}>
      <FormCadastroMatriz curso={curso} loading={loading} onFinish={cadastrarMatriz} />
    </Modal>
  );
}
