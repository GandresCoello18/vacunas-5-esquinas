import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tag, Skeleton, Alert, Avatar } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Paciente_INT } from "../../interface";
import { DeleteOutlined } from "@ant-design/icons";
import { DOMAIN } from "../../config/domain";

interface props {
  limit?: number;
}

export function TablePaciente({ limit }: props) {
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

  const [Paciente, setPaciente] = useState<Array<Paciente_INT>>([]);
  const PacienteReducer = useSelector(
    (state: RootState) => state.PacienteReducer
  );

  useEffect(() => {
    if (limit) {
      setPaciente(PacienteReducer.Pacientes.splice(limit));
    } else {
      setPaciente(PacienteReducer.Pacientes);
    }
  }, [limit, PacienteReducer]);

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Codigo</Col>
        <Col span={3}>Nombres</Col>
        <Col span={3}>Apellido</Col>
        <Col span={2}>Peso</Col>
        <Col span={2}>Altura</Col>
        <Col span={2}>{limit ? "Foto" : "Optiones"}</Col>
      </Row>
      {PacienteReducer.loading && <Skeleton />}
      {Paciente.map((item, index) => (
        <Row justify="space-between" style={Styles.body_table} key={index}>
          <Col span={3}>
            <Tag color="cyan">{item.codigo}</Tag>
          </Col>
          <Col span={3}>{item.nombres}</Col>
          <Col span={3}>{item.apellidos}</Col>
          <Col span={2}>{item.peso}</Col>
          <Col span={2}>{item.altura}</Col>
          <Col span={2}>
            {limit ? (
              <Avatar src={`${DOMAIN}/static/pacientes/${item.img}`} />
            ) : (
              <Button danger>
                <DeleteOutlined />
              </Button>
            )}
          </Col>
        </Row>
      ))}

      <br />

      <Row justify="center">
        <Col span={20}>
          {Paciente.length === 0 && (
            <Alert type="info" message="No hay datos que mostrar" />
          )}

          {limit && Paciente.length > 5 && (
            <Button type="dashed">Todo los Pacientes</Button>
          )}
        </Col>
      </Row>
    </>
  );
}
