import React, { useState } from "react";
import { Row, Col, Form, Input, Button, Select, Alert } from "antd";
import { TablePaciente } from "./table-paciente";
import { TableRepresentante } from "./table-representante";

export function IngresoPaciente(): JSX.Element {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const send = (data: any) => {
    console.log(data);
    setIsLoading(true);

    setIsLoading(false);
  };

  return (
    <>
      <Row justify="space-around">
        <Col style={styles.box} xs={20} md={11}>
          <h3 style={{ textAlign: "center", padding: 10 }}>Paciente</h3>
          <Form form={form} onFinish={send} name="dynamic_rule">
            <Form.Item
              name="nombre"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: "Ingrese sus Nombres.",
                },
              ]}
            >
              <Input placeholder="Ingrese sus nombres." />
            </Form.Item>
            <Form.Item
              label="Apellidod"
              name="apellido"
              rules={[
                {
                  required: true,
                  message: "Escriba los apellidos.",
                },
              ]}
            >
              <Input placeholder="Ingrese los apellidos." />
            </Form.Item>
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  name="peso"
                  label="Peso"
                  rules={[
                    {
                      required: true,
                      message: "Escriba el peso.",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Ingrese el peso." />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="altura"
                  label="Altura"
                  rules={[
                    {
                      required: true,
                      message: "Escriba la altura.",
                    },
                  ]}
                >
                  <Input placeholder="Ingrese la altura." />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Guardar paciente
              </Button>
            </Form.Item>
          </Form>
          <Alert
            type="info"
            message="Estos datos deben de coincidir con la partida de nacimiento."
          />
        </Col>
        <Col style={styles.box} xs={20} md={11}>
          <h3 style={{ textAlign: "center", padding: 10 }}>
            Pacientes reciente
          </h3>
          <TablePaciente limit={4} />
        </Col>
      </Row>
      <br />
      <Row justify="space-around">
        <Col style={styles.box} xs={20} md={10}>
          <h3 style={{ textAlign: "center", padding: 10 }}>Representante</h3>
          <Form form={form} onFinish={send} name="dynamic_rule">
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  label="Cedula"
                  name="Cedula"
                  rules={[
                    {
                      required: true,
                      message: "Escribe el numero de identificacion.",
                    },
                  ]}
                >
                  <Input placeholder="Inserte el numero de indentificacion." />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="Sexo"
                  label="Sexo"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione el sexo.",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="Masculino">Masculino</Select.Option>
                    <Select.Option value="Femenino">Femenino</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="Nombres"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: "Escriba los nombres.",
                },
              ]}
            >
              <Input placeholder="Escriba los nombres." />
            </Form.Item>
            <Form.Item
              label="Apellidos"
              name="Apelldios"
              rules={[
                {
                  required: true,
                  message: "Escriba los apellidos.",
                },
              ]}
            >
              <Input placeholder="Escriba los apellidos." />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Guardar
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col style={styles.box} xs={20} md={10}>
          <h3 style={{ textAlign: "center", padding: 10 }}>
            Representante recientes
          </h3>
          <TableRepresentante limit={3} />
        </Col>
      </Row>
    </>
  );
}
