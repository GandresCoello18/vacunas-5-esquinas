import { Col, Collapse, Divider, message, Row, Spin, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPacienteVacuna } from "../api/vacuna-paciente";
import { Layout } from "../component/layout";
import { DetallePaciente } from "../component/pacientes/datalle-paciente";
import { ListItemVacunas } from "../component/vacunas/list-item";
import { incrementarMes } from "../hooks/fecha";
import { Mis_Vacunas_INT, Paciente_INT } from "../interface";
import { RootState } from "../redux";

interface Params {
  id_paciente: string;
}

export function MisVacunas() {
  const styles: any = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
    subTitle: {
      textAlign: "center",
      fontSize: 20,
      padding: 10,
    },
    border: {
      border: 1,
      borderStyle: "solid",
      padding: 10,
      borderColor: "#cdcdcd",
    },
    celda: {
      border: 1,
      borderStyle: "solid",
      color: "#001529",
      textAlign: "center",
      padding: 4,
      borderColor: "#cdcdcd",
    },
    celda_yellow: {
      border: 1,
      borderStyle: "solid",
      background: "yellow",
      color: "#001529",
      textAlign: "center",
      padding: 4,
      borderColor: "#cdcdcd",
    },
  };

  const { Panel } = Collapse;

  const [misVacunas, setMisVacunas] = useState<Array<Mis_Vacunas_INT>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [thisPaciente, setThisPaciente] = useState<Paciente_INT>();

  const pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

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

    setThisPaciente(
      pacientes.find((item) => item.id_paciente === params.id_paciente)
    );

    setIsLoading(false);
  }, [params, pacientes]);

  return (
    <>
      <Layout head_title="Mi Calendario">
        <h3 style={styles.subTitle}>Mis vacunas</h3>
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
        <Divider />
        <h3 style={styles.subTitle}>Proximas vacunas</h3>
        <Row justify="center">
          <Col style={styles.box} lg={20}>
            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <b>{moment(thisPaciente?.nacimiento).format("LL")}</b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 1)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 2)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 4)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 6)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 12)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 15)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>
                  {moment(incrementarMes(thisPaciente?.nacimiento, 18)).format(
                    "LL"
                  )}
                </b>
              </Col>
              <Col style={styles.celda} span={2}>
                <b>Total</b>
              </Col>
            </Row>
            <Row justify="center">
              <Col style={styles.celda} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepb
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">3</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                RV
              </Col>
              <Col style={styles.celda} span={2}>
                RV
              </Col>
              <Col style={styles.celda} span={2}>
                RV
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">3</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                DTaP
              </Col>
              <Col style={styles.celda} span={2}>
                DTaP
              </Col>
              <Col style={styles.celda} span={2}>
                DTaP
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                DTaP
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                DTaP
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">4</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                Hib
              </Col>
              <Col style={styles.celda} span={2}>
                Hib
              </Col>
              <Col style={styles.celda} span={2}>
                Hib
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hib
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hib
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">4</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                PCV13
              </Col>
              <Col style={styles.celda} span={2}>
                PCV13
              </Col>
              <Col style={styles.celda} span={2}>
                PCV13
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                PCV13
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                PCV13
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">4</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                IPV
              </Col>
              <Col style={styles.celda} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">3</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                IPV
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">1</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                MMR
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                MMR
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">1</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Varicela
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Varicela
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">1</Tag>
              </Col>
            </Row>

            <Row justify="center">
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="red">Null</Tag>
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepa
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepa
              </Col>
              <Col style={styles.celda_yellow} span={2}>
                Hepa
              </Col>
              <Col style={styles.celda} span={2}>
                <Tag color="green">1</Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
      </Layout>
    </>
  );
}
