import { Col, Row } from "antd";
import React from "react";
import { TablesUsuario } from "./table-usuarios";

export function UsuariosAdmin() {
  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Usuarios
      </h3>
      <Row justify="space-around">
        <Col xs={22} md={16}>
          <TablesUsuario />
        </Col>
      </Row>
    </>
  );
}
