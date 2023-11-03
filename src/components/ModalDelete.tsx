import React from "react";

// import { Container } from './styles';
import { Alert, Modal, Typography } from "antd";
import { WarningOutlined } from "@ant-design/icons";

interface ModalDeleteProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  text: string;
}

export const ModalDelete = ({ open, onOk, onCancel, text }: ModalDeleteProps) => {
  return (
    <Modal
      title={
        <Typography.Title type="danger" level={4} style={{ margin: 0 }}>
          <WarningOutlined /> Confirmação de Exclusão
        </Typography.Title>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText="Confirmar"
      cancelText="Desistir"
      okType="danger"
    >
      <Alert
        type="error"
        message={`Tem certeza de que deseja apagar ${
          text || "isso"
        } permanentemente? Essa ação não poderá ser desfeita.`}
      />
    </Modal>
  );
};