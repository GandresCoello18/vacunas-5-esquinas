import { Button, Modal } from "antd";
import React, { useState } from "react";

interface Props {
  button: string;
  children: any;
  icon?: any;
  titleModal: string;
}

export function ModalBasic({ button, children, icon, titleModal }: Props) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <Button icon={icon} onClick={() => setModal(true)}>
        {button}
      </Button>
      <Modal
        title={titleModal}
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        {children}
      </Modal>
    </>
  );
}
