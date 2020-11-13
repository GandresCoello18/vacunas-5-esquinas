import { Col, message, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMisMenciones } from "../api/discucion";
import { CommentDiscucion } from "../component/discuciones/coment-disccion";
import { Layout } from "../component/layout";
import { DetallePaciente } from "../component/pacientes/datalle-paciente";
import { Discucion_Menciones_INT } from "../interface";

interface Params {
  id_paciente: string;
}

export function MisMenciones() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const params: Params = useParams();
  const [selectPaciente, setSelectPaciente] = useState<string>("");
  const [name, setname] = useState<string>("Anonimo");
  const [MisMenciones, setMisMenciones] = useState<
    Array<Discucion_Menciones_INT>
  >([]);

  useEffect(() => {
    const fetch_mis_menciones = async () => {
      try {
        const menciones: Array<Discucion_Menciones_INT> = await (
          await getMisMenciones(params.id_paciente)
        ).data;
        setMisMenciones(menciones);
        const paciente = menciones.find(
          (item) => item.id_paciente === params.id_paciente
        );
        setname(paciente?.nombres + " " + paciente?.apellidos);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetch_mis_menciones();
  }, [params]);

  return (
    <>
      <Layout head_title="Mis menciones">
        <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
          Menciones de: <b>{name}</b>
        </h3>
        <br />
        <Row justify="space-around">
          <Col xs={22} md={17} style={styles.box}>
            <CommentDiscucion
              Discuciones={MisMenciones}
              setSelectPaciente={setSelectPaciente}
            />
          </Col>
          <Col xs={22} md={6} style={styles.box}>
            <DetallePaciente
              id_paciente={selectPaciente ? selectPaciente : params.id_paciente}
            />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
