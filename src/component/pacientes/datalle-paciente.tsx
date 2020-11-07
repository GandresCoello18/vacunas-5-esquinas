import React from "react";
import { Row, Col, Empty, Progress, Button, Divider, Tag } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";

interface Props {
  id_paciente: string;
}

export function DetallePaciente({ id_paciente }: Props) {
  return (
    <>
      <Empty description="Selecciona algun paciente." />
      <Row justify="center">
        <Col span={11}>
          <img
            style={{ borderRadius: "50%" }}
            alt="avatar paciente"
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
        <Col span={20}>
          <h2 style={{ textAlign: "center" }}>Andres coello</h2>
          <br />
          <h4>Progreso</h4>
          <Progress percent={50} status="active" />
        </Col>
      </Row>
      <br />
      <Row justify="space-around">
        <Col span={7}>
          <Button>Mis vacunas</Button>
        </Col>
        <Col span={7}>
          <Button>Menciones</Button>
        </Col>
        <Col span={7}>
          <Button>Estadisticas</Button>
        </Col>
      </Row>
      <Divider />
      <h3>
        Su representante:{" "}
        <Tag color="green">
          <UserSwitchOutlined /> Martha Goyes
        </Tag>
      </h3>

      <Button
        style={{ position: "absolute", bottom: 10, left: 0 }}
        danger
        block
      >
        Eliminar
      </Button>
    </>
  );
}
