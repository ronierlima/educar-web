import { Modal, message } from "antd";
import { useState } from "react";
import { ApiService } from "../../../services/api";
import { Curso, MatrizCurricular } from "../Cursos";
import { FormCadastroSemestre } from "./FormCadastroSemestre";

export interface ModalCadastroSemestreProps {
  curso: Curso;
  matriz: MatrizCurricular;
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroSemestre({ curso, matriz, open, close, refresh }: ModalCadastroSemestreProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const cadastrarSemestre = async (values: Curso) => {
    setLoading(true);
    try {
      await ApiService.post(`/matrizes/${matriz?.id}/semestres`, values);

      message.success("cadastro realizado");

      refresh();
      close();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? `Erro ao cadastrar: ${error.message}` : "Erro desconhecido ao cadastrar o semestre.";

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal destroyOnClose title="Novo Semestre" open={open} onCancel={close} footer={null}>
      <FormCadastroSemestre curso={curso} matriz={matriz} loading={loading} onFinish={cadastrarSemestre} />
    </Modal>
  );
}
