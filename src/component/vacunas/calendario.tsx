import React from "react";
import { Row, Col, Divider } from "antd";
import Enfermedades from "../../util/enfermedades.json";

export function CalendarioVacuna() {
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

  return (
    <>
      <Row justify="center">
        <Col>
          <h3
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              padding: 15,
            }}
          >
            Calendario para vacunas
          </h3>
          <img src="../img/calendario.png" alt="calendario-vacunas" />
        </Col>
        <Col>
          <h3
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              padding: 15,
            }}
          >
            Enfermedades que se pueden prevenir con vacunas
          </h3>
          <Divider />

          <Row
            justify="space-between"
            style={Styles.head_table}
            id="enfermedades"
          >
            <Col span={2}>Enfermedad</Col>
            <Col span={3}>Vacuna</Col>
            <Col span={3}>Trasmision</Col>
            <Col span={7}>Sintomas</Col>
            <Col span={7}>Complicaciones</Col>
          </Row>
          {Enfermedades.map((item, index) => (
            <Row justify="space-between" style={Styles.body_table} key={index}>
              <Col span={2}>{item.enfermedad}</Col>
              <Col span={3}>{item.vacuna}</Col>
              <Col span={3}>{item.trasmision}</Col>
              <Col span={7}>{item.sintomas}</Col>
              <Col span={7}>{item.complicaciones}</Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
}
