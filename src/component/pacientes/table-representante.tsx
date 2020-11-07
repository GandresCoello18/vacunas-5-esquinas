import React, { useEffect, useState } from "react";
import { Row, Col, Button, Alert, Tag, Skeleton } from "antd";
import { useSelector } from "react-redux";
import { Representantes_INT } from "../../interface";
import { RootState } from "../../redux";
import { DeleteOutlined } from "@ant-design/icons";

interface props {
  limit?: number;
}

export function TableRepresentante({ limit }: props) {
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

  const [Representante, setRepresentante] = useState<Array<Representantes_INT>>(
    []
  );
  const RepresentanteReducer = useSelector(
    (state: RootState) => state.Representantes
  );

  useEffect(() => {
    if (limit) {
      setRepresentante(RepresentanteReducer.Representante.splice(limit));
    } else {
      setRepresentante(RepresentanteReducer.Representante);
    }
  }, [limit, RepresentanteReducer]);

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Cedula</Col>
        <Col span={3}>Sexo</Col>
        <Col span={3}>Nombres</Col>
        <Col span={3}>Apellido</Col>
        <Col span={2}>Optiones</Col>
      </Row>
      {RepresentanteReducer.loading && <Skeleton />}
      {Representante.map((item: Representantes_INT, index: number) => (
        <Row justify="space-between" style={Styles.body_table} key={index}>
          <Col span={3}>
            <Tag color="magenta" style={{ fontSize: 17 }}>
              {item.cedula}
            </Tag>
          </Col>
          <Col span={3}>{item.sexo}</Col>
          <Col span={3}>{item.nombres}</Col>
          <Col span={3}>{item.apellidos}</Col>
          <Col span={2}>
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      ))}

      <br />

      <Row justify="center">
        <Col span={20}>
          {Representante.length === 0 && (
            <Alert type="info" message="No hay datos que mostrar" />
          )}

          {limit && Representante.length > 5 && (
            <Button type="dashed">Todo los Representantes</Button>
          )}
        </Col>
      </Row>
    </>
  );
}
