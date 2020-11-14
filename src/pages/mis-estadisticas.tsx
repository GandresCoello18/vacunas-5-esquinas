import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSeguimineto } from "../api/seguimineto";
import { LineGraficoAltura } from "../component/graficos/line-altura";
import { LineGraficoMiEstadisctica } from "../component/graficos/line-mi-estadisticas";
import { LineGraficoPeso } from "../component/graficos/line-peso";
import { Layout } from "../component/layout";
import { Peso_Altura_INT } from "../interface";

interface Params {
  id_paciente: string;
}

export function MisEstadisticas() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const params: Params = useParams();
  const [altura, setAltura] = useState<Array<number>>([]);

  useEffect(() => {
    const fetch = async () => {
      const resSeguimiento: Array<Peso_Altura_INT> = await (
        await GetSeguimineto(params.id_paciente)
      ).data;
      let alturas: Array<number> = [];

      resSeguimiento.map((item) => alturas.push(item.altura));

      setAltura(alturas);
    };

    fetch();
  }, [params]);

  return (
    <>
      <Layout head_title="Mis Estadisttica">
        <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
          Mis Estadisticas
        </h3>
        <br />
        <Row justify="space-around">
          <Col xs={22} md={11} style={styles.box}>
            <LineGraficoMiEstadisctica MisDatos={altura} />
          </Col>
          <Col xs={22} md={11} style={styles.box}>
            <h3>Tendencia de altura normal</h3>
            <LineGraficoAltura />
          </Col>
        </Row>

        <br />

        <Row justify="space-around">
          <Col xs={22} md={11} style={styles.box}>
            <LineGraficoMiEstadisctica MisDatos={altura} />
          </Col>
          <Col xs={22} md={11} style={styles.box}>
            <h3>Tendencia de peso normal</h3>
            <LineGraficoPeso />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
