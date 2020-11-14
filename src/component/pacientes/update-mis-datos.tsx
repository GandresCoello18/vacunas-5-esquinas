import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Paciente_INT, Representantes_INT } from "../../interface";
import { RootState } from "../../redux";

interface Props {
  paciente: Paciente_INT;
}

export function UpdateMisDatos({ paciente }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { Option } = Select;

  const Representantes: Array<Representantes_INT> = useSelector(
    (state: RootState) => state.Representantes.Representante
  );

  const send = async (data: any) => {
    setIsLoading(true);

    try {
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
        <Form.Item
          name="nombres"
          label="Nombres"
          rules={[
            {
              required: true,
              message: "Ingrese sus Nombres.",
            },
          ]}
        >
          <Input
            placeholder="Ingrese sus nombres."
            disabled={!isUpdate}
            defaultValue={paciente.nombres}
          />
        </Form.Item>
        <Form.Item
          name="apellidos"
          label="Apellidos"
          rules={[
            {
              required: true,
              message: "Ingrese sus Apellidos.",
            },
          ]}
        >
          <Input
            placeholder="Ingrese sus apellidos."
            disabled={!isUpdate}
            defaultValue={paciente.apellidos}
          />
        </Form.Item>
        <Row justify="space-around">
          <Col span={10}>
            <Form.Item
              name="peso"
              label="Peso"
              rules={[
                {
                  required: true,
                  message: "Ingrese tu peso.",
                },
              ]}
            >
              <Input
                placeholder="Ingrese su peso."
                disabled={!isUpdate}
                defaultValue={paciente.peso}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="altura"
              label="Altura"
              rules={[
                {
                  required: true,
                  message: "Ingrese tu altura.",
                },
              ]}
            >
              <Input
                placeholder="Ingrese tu altura."
                disabled={!isUpdate}
                defaultValue={paciente.altura}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="representante"
          label="Representante"
          rules={[
            {
              required: true,
              message: "Selecciona el representante.",
            },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            disabled={!isUpdate}
            placeholder="Selecciona el representante..."
          >
            {Representantes.map((representante) => (
              <Option value={representante.cedula}>
                {representante.nombres} {representante.apellidos}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Row justify="space-around">
            <Col span={10}>
              <Button
                block
                color="yellow"
                disabled={isUpdate}
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Actualizar
              </Button>
            </Col>
            <Col span={10}>
              <Button
                htmlType="submit"
                block
                type="primary"
                disabled={!isUpdate}
                loading={isLoading}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
