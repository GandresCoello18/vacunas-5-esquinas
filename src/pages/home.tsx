import { Row, Col, Divider } from "antd";
import React from "react";
import { CommentDiscucion } from "../component/discuciones/coment-disccion";
import { FromDiscucion } from "../component/discuciones/form-discucion";
import { ListDiscucionCantidad } from "../component/discuciones/list-discucion-cantidad";
import { LineGraficoPeso } from "../component/graficos/line-peso";
import { LineGraficoAltura } from "../component/graficos/line-altura";
import { Layout } from "../component/layout";

export function HomePage() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  return (
    <>
      <Layout head_title="Inicio">
        <Row justify="space-around">
          <Col xs={24} md={11} style={styles.box}>
            <br />
            <h3>Peso en KLG: tendencia de crecimiento</h3>
            <Divider />
            <LineGraficoPeso />
          </Col>
          <Col xs={12} md={11} style={styles.box}>
            <h3>Altura en CM: tendencia de crecimiento</h3>
            <Divider />
            <LineGraficoAltura />
          </Col>
        </Row>

        <Row justify="space-around">
          <Col style={styles.box} xs={24} md={8}>
            <h3>Enviar nuevo mensaje</h3>
            <Divider />
            <FromDiscucion />
          </Col>
          <Col style={styles.box} xs={24} md={8}>
            <h3>Discucciones</h3>
            <Divider />
            <CommentDiscucion />
          </Col>
          <Col style={styles.box} xs={24} md={6}>
            <h3>Cantidad mensajes</h3>
            <Divider />
            <ListDiscucionCantidad />
          </Col>
        </Row>
      </Layout>
    </>
  );
}
