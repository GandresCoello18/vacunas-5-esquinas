import React, { useState } from "react";
import { Form, Input, Button } from "antd";

export function FromDiscucion() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const send = (data: any) => {
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
        <Form.Item
          name="Asunto"
          rules={[
            {
              required: true,
              message: "Falta escribir el asunto del comentario.",
            },
          ]}
        >
          <Input type="text" placeholder="Asunto de su comentario" />
        </Form.Item>
        <Form.Item
          name="mensaje"
          rules={[
            {
              required: true,
              message: "Falta escribir el contenido del mensaje.",
            },
          ]}
        >
          <TextArea placeholder="Escriba el contenido del mensaje" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" block loading={isLoading} type="primary">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
