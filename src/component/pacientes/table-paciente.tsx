import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tag } from "antd";

interface props {
  limit?: number;
}

export function TablePaciente({ limit }: props) {
  const Styles = {
    head_table: {
      backgroundColor: "#001529",
      color: "#fff",
      padding: 20,
    },
    body_table: {
      backgroundColor: "#fff",
      color: "#001529",
      padding: 20,
      border: 2,
      borderWidth: 2,
      borderColor: "#cdcdcd",
      borderStyle: "solid",
    },
  };

  const [Paciente, setPaciente] = useState<Array<number>>([]);

  useEffect(() => {
    if (limit) {
      setPaciente([5, 1, 6, 1, 74, 2, 3, 4, 4].splice(1, limit));
    } else {
      setPaciente([5, 1, 6, 1, 74, 2, 3, 4, 4]);
    }
  }, [limit]);

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Codigo</Col>
        <Col span={3}>Nombres</Col>
        <Col span={3}>Apellido</Col>
        <Col span={2}>Peso</Col>
        <Col span={2}>Altura</Col>
        <Col span={2}>Optiones</Col>
      </Row>
      {Paciente.map((item, index) => (
        <Row justify="space-between" style={Styles.body_table} key={index}>
          <Col span={3}>
            <Tag color="cyan">{item}</Tag>
          </Col>
          <Col span={3}>{item}</Col>
          <Col span={3}>{item}</Col>
          <Col span={2}>{item}</Col>
          <Col span={2}>{item}</Col>
          <Col span={2}>{item}</Col>
        </Row>
      ))}

      <br />

      <Row justify="center">
        <Col>{limit && <Button type="dashed">Todo los pacientes</Button>}</Col>
      </Row>
    </>
  );
}
