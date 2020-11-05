import { Row, Col, Divider, DatePicker } from "antd";
import React from "react";
import { CommentDiscucion } from "../component/discuciones/coment-disccion";
import { FromDiscucion } from "../component/discuciones/form-discucion";
import { ListDiscucionCantidad } from "../component/discuciones/list-discucion-cantidad";
import { LineGrafico } from "../component/graficos/line";
import { PastelGrafico } from "../component/graficos/pastel";
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
          <Col xs={24} md={15} style={styles.box}>
            <br />
            <Row>
              <Col span="3">
                <h3>Datos vacunas:</h3>
              </Col>
              <Col span="4">
                <DatePicker
                  placeholder="Selecionar fecha"
                  onChange={(date, dateString) => console.log(dateString)}
                />
              </Col>
            </Row>
            <Divider />
            <LineGrafico />
          </Col>
          <Col xs={12} md={7} style={styles.box}>
            <h3>Datos vacunas:</h3>
            <Divider />
            <PastelGrafico />
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
