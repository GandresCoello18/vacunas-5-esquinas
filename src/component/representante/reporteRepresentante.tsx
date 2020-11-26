import React, { useState, useEffect } from "react";
import { TableRepresentante } from "./table-representante";
import { Row, Col, Empty, Divider } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { CardDetallePaciente } from "../pacientes/card-detalles-paciente";
import { Paciente_INT, Usuario_INT } from "../../interface";

export function ReporteRepresentante() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
      height: "auto",
    },
  };

  const [SelectRepresentente, setSelectRepresentante] = useState<number>(0);
  const [thisPacientes, setThisPacientes] = useState<Array<Paciente_INT>>([]);

  const Pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

  useEffect(() => {
    if (SelectRepresentente) {
      const findPacientes = Pacientes.filter(
        (paciente) => paciente.id_representante === SelectRepresentente
      );
      setThisPacientes(findPacientes);
    }
  }, [SelectRepresentente, Pacientes]);

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Reportes de los representantes
      </h3>
      <Row justify="space-around">
        <Col xs={22} md={17} style={styles.box}>
          <TableRepresentante setSelectRepresentante={setSelectRepresentante} />
        </Col>
        <Col xs={22} md={6} className="scroll-card-detalles">
          {SelectRepresentente ? (
            thisPacientes.map((paciente) => (
              <>
                <CardDetallePaciente
                  thisPaciente={paciente}
                  thisRepresentante={undefined}
                  isAdmin={Session.isAdmin}
                />
                <Divider />
              </>
            ))
          ) : (
            <Empty description="Selecciona algun representante...." />
          )}
        </Col>
      </Row>
    </>
  );
}
