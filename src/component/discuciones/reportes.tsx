import { Col, DatePicker, Input, Row, Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { fecha_actual } from "../../hooks/fecha";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { DetallePaciente } from "../pacientes/datalle-paciente";
import { CommentDiscucion } from "./coment-disccion";
import { Discucion_Menciones_INT } from "../../interface";

export function ReportesDiscuciones() {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const Discuciones: Array<Discucion_Menciones_INT> = useSelector(
    (state: RootState) => state.DiscucionesReducer.Discuciones
  );

  const { Option } = Select;

  const [selectPaciente, setSelectPaciente] = useState<string>("");
  const [selectSearch, setSelectSearch] = useState<string>("codigo");
  const [SearchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Reportes de discuciones: <u>"{moment(fecha_actual()).format("LL")}"</u>
      </h3>
      <br />
      <Row justify="center">
        <Col xs={1}>
          <h4>Buscar: {SearchValue}</h4>
        </Col>
        <Col xs={3}>
          <Select
            defaultValue="codigo"
            style={{ width: "100%" }}
            onChange={(value) => setSelectSearch(value)}
          >
            <Option value="codigo">codigo del paciente</Option>
            <Option value="fecha">fecha de discucion</Option>
          </Select>
        </Col>
        &nbsp;
        <Col xs={3}>
          {selectSearch === "codigo" ? (
            <Input
              placeholder="Codigo del paciente aqui..."
              onChange={(event) => setSearchValue(event.target.value)}
            />
          ) : (
            <DatePicker
              onChange={(date: any, dateString: string) =>
                setSearchValue(dateString)
              }
            />
          )}
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={22} md={17} style={styles.box}>
          <CommentDiscucion
            Discuciones={Discuciones}
            setSelectPaciente={setSelectPaciente}
          />
        </Col>
        <Col xs={22} md={6} style={styles.box}>
          <DetallePaciente id_paciente={selectPaciente} />
        </Col>
      </Row>
    </>
  );
}
