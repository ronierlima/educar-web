import { Modal, message } from "antd";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { handleApiError } from "../../../handleApiError";
import { Curso } from "../Cursos";
import { FormCadastroCurso } from "./FormCadastroCurso";

export interface ModalCadastroCursosProps {
  open: boolean;
  close: () => void;
  refresh: () => void;
}

export function ModalCadastroCursos({ open, close, refresh }: ModalCadastroCursosProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const cadastrarCurso = async (values: Curso) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/cursos", values);

      messageApi.open({
        type: "success",
        content: "cadastro realizado",
      });

      refresh();
      close();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: handleApiError(error as AxiosError),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Novo Curso" open={open} onCancel={close} footer={null}>
      {contextHolder}
      <FormCadastroCurso loading={loading} onFinish={cadastrarCurso} />
    </Modal>
  );
}
