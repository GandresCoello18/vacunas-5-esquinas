import { Alert, Col, Row, Skeleton, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Vacunas_INT } from "../../interface";
import { RootState } from "../../redux";

export function TablesVacunas() {
  const Styles = {
    head_table: {
      backgroundColor: "#001529",
      color: "#fff",
      padding: 20,
    },
    body_table: {
      backgroundColor: "#fff",
      color: "#001529",
      padding: 20,
      border: 2,
      borderWidth: 2,
      borderColor: "#cdcdcd",
      borderStyle: "solid",
    },
  };

  const VacunasReducer = useSelector(
    (state: RootState) => state.VacunasReducer
  );

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Vacuna</Col>
        <Col span={3}># X paciente</Col>
        <Col span={3}>Opciones</Col>
      </Row>
      {VacunasReducer.loading && <Skeleton />}
      {VacunasReducer.Vacunas.map((vacuna: Vacunas_INT) => (
        <Row
          justify="space-between"
          style={Styles.body_table}
          key={vacuna.id_vacuna}
        >
          <Col span={3}>
            <Tag color="success" style={{ fontSize: 18 }}>
              {vacuna.vacuna_name}
            </Tag>
          </Col>
          <Col span={3}>
            <Tag color="magenta" style={{ fontSize: 18 }}>
              {vacuna.cantidad}
            </Tag>
          </Col>
          <Col span={3}>{vacuna.id_vacuna}</Col>
        </Row>
      ))}

      {VacunasReducer.Vacunas.length === 0 && (
        <Alert type="info" message="No hay datos para mostrar....." />
      )}
    </>
  );
}
