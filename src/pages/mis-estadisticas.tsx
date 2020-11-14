import { Col, message, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSeguimineto } from "../api/seguimineto";
import { LineGraficoAltura } from "../component/graficos/line-altura";
import { LineGraficoMiEstadisctica } from "../component/graficos/line-mi-estadisticas";
import { LineGraficoPeso } from "../component/graficos/line-peso";
import { Layout } from "../component/layout";
import { ModalBasic } from "../component/layout/modal";
import { ListPesoAltura } from "../component/pacientes/list-peso-altura";
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
  const [seguimiento, setSeguimiento] = useState<Array<Peso_Altura_INT>>([]);
  const [altura, setAltura] = useState<Array<number>>([]);
  const [peso, setPeso] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetch = async () => {
        const resSeguimiento: Array<Peso_Altura_INT> = await (
          await GetSeguimineto(params.id_paciente)
        ).data;
        console.log(resSeguimiento);
        setSeguimiento(resSeguimiento);

        let alturas: Array<number> = [];
        let pesos: Array<number> = [];

        resSeguimiento.map((item) => alturas.push(item.altura));
        resSeguimiento.map((item) => pesos.push(item.peso));

        setAltura(alturas);
        setPeso(pesos);
        setIsLoading(false);
      };

      fetch();
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
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
            <ModalBasic button="Ver datos" titleModal="Datos mi altura">
              <ListPesoAltura type="Altura" data={seguimiento} />
            </ModalBasic>
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <LineGraficoMiEstadisctica MisDatos={altura} />
            )}
          </Col>
          <Col xs={22} md={11} style={styles.box}>
            <h3>Tendencia de altura normal</h3>
            <LineGraficoAltura />
          </Col>
        </Row>

        <br />

        <Row justify="space-around">
          <Col xs={22} md={11} style={styles.box}>
            <ModalBasic button="Ver datos" titleModal="Datos mi peso">
              <ListPesoAltura type="Peso" data={seguimiento} />
            </ModalBasic>
            {isLoading ? (
              <Spin size="large" />
            ) : (
              <LineGraficoMiEstadisctica MisDatos={peso} />
            )}
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
