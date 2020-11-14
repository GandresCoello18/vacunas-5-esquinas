import { Col, Collapse, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetPacienteVacuna } from "../api/vacuna-paciente";
import { Layout } from "../component/layout";
import { DetallePaciente } from "../component/pacientes/datalle-paciente";
import { ListItemVacunas } from "../component/vacunas/list-item";
import { Mis_Vacunas_INT } from "../interface";

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

  const [misVacunas, setMisVacunas] = useState<Array<Mis_Vacunas_INT>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params: Params = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchPV = async () => {
      try {
        const resPV: Array<Mis_Vacunas_INT> = (
          await GetPacienteVacuna(params.id_paciente)
        ).data;
        setMisVacunas(resPV);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchPV();
    setIsLoading(false);
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
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <Collapse defaultActiveKey={["1"]}>
                {misVacunas.map((item, index) => (
                  <Panel
                    header={
                      <>
                        Vacuna: <b>{item.vc}</b>
                      </>
                    }
                    key={index}
                  >
                    <ListItemVacunas list={item.list} />
                  </Panel>
                ))}
              </Collapse>
            )}
          </Col>
          <Col xs={22} md={6} style={styles.box}>
            <DetallePaciente id_paciente={params.id_paciente} />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
