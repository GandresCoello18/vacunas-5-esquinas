import { Alert, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { TablesVacunas } from "./tables-vacunas";

export function ReporteVacuna() {
  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Reportes de vacunas
      </h3>
      <Row justify="center">
        <Col xs={22} md={10}>
          <TablesVacunas />
        </Col>
      </Row>
      <br />
      <Row justify="center">
        <Col xs={22} md={10}>
          <Link to="/vacunas/calendario#enfermedades">
            <Alert
              type="info"
              message="Vacunas que combaten con las enfermedades....."
            />
          </Link>
        </Col>
      </Row>
    </>
  );
}
