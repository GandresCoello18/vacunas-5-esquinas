import React, { useState } from "react";
import { Row, Col } from "antd";
import { TablePaciente } from "./table-paciente";
import { DetallePaciente } from "./datalle-paciente";
import { Usuario_INT } from "../../interface";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

export function ReportePaciente() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const [IdPaciente, setIdPaciente] = useState<string>("");

  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Reportes de los pacientes
      </h3>
      <Row justify="space-around">
        <Col xs={22} md={17} style={styles.box}>
          <TablePaciente setIdPaciente={setIdPaciente} />
        </Col>
        <Col xs={22} md={6} style={styles.box}>
          <DetallePaciente id_paciente={IdPaciente} isAdmin={Session.isAdmin} />
        </Col>
      </Row>
    </>
  );
}
