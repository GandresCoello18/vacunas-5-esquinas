import { Col, DatePicker, message, Row, Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { fecha_actual } from "../../hooks/fecha";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { DetallePaciente } from "../pacientes/datalle-paciente";
import { CommentDiscucion } from "./coment-disccion";
import { Discucion_Menciones_INT } from "../../interface";
import { getDiscucion } from "../../api/discucion";

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

  const [dataSearch, setDataSearch] = useState<Array<Discucion_Menciones_INT>>(
    []
  );
  const [selectPaciente, setSelectPaciente] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [SearchValue, setSearchValue] = useState<string>(fecha_actual());

  const selectDate = async (date: any, dateString: string) => {
    setSearchValue(dateString);
    setIsLoading(true);

    try {
      const res = await (await getDiscucion(dateString)).data;
      setDataSearch(res);
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: 20, padding: 10 }}>
        Reportes de discuciones: <u>"{moment(SearchValue).format("LL")}"</u>
      </h3>
      <br />
      <Row justify="center">
        <Col xs={1}>
          <h4>Buscar: </h4>
        </Col>
        &nbsp;
        <Col xs={3}>
          <DatePicker onChange={selectDate} />
        </Col>
      </Row>
      <Row justify="space-around">
        <Col xs={22} md={17} style={styles.box}>
          {isLoading ? (
            <Spin size="large" />
          ) : (
            <CommentDiscucion
              Discuciones={dataSearch ? dataSearch : Discuciones}
              setSelectPaciente={setSelectPaciente}
            />
          )}
        </Col>
        <Col xs={22} md={6} style={styles.box}>
          <DetallePaciente id_paciente={selectPaciente} />
        </Col>
      </Row>
    </>
  );
}
