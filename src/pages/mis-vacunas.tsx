import { Col, Collapse, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPacienteVacuna } from "../api/vacuna-paciente";
import { Layout } from "../component/layout";
import { DetallePaciente } from "../component/pacientes/datalle-paciente";
import { ListItemVacunas } from "../component/vacunas/list-item";
import { Vacuna_Paciente_Relacionado_INT } from "../interface";

interface Params {
  id_paciente: string;
}

export function MisVacunas() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const { Panel } = Collapse;

  const [misVacunas, setMisVacunas] = useState<
    Array<Vacuna_Paciente_Relacionado_INT>
  >([]);
  console.log(misVacunas);
  const params: Params = useParams();

  useEffect(() => {
    const fetchPV = async () => {
      const resPV: Array<Vacuna_Paciente_Relacionado_INT> = (
        await GetPacienteVacuna(params.id_paciente)
      ).data;
      setMisVacunas(resPV);
    };

    fetchPV();
  }, [params]);

  return (
    <>
      <Layout head_title="Mi Calendario">
        <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
          Mis vacunas
        </h3>
        <br />
        <Row justify="space-around">
          <Col xs={22} md={17} style={styles.box}>
            <Collapse defaultActiveKey={["1"]}>
              {misVacunas.map((item) => (
                <Panel
                  header={
                    <>
                      Vacuna: <b>{item.vacuna_name}</b>
                    </>
                  }
                  key="1"
                >
                  <ListItemVacunas vacuna_paciente={item} />
                </Panel>
              ))}
            </Collapse>
          </Col>
          <Col xs={22} md={6} style={styles.box}>
            <DetallePaciente id_paciente={params.id_paciente} />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
