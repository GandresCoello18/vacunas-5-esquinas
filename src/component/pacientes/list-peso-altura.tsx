import { Col, Row, Tag } from "antd";
import moment from "moment";
import React from "react";
import { Peso_Altura_INT } from "../../interface";

interface Props {
  type: string;
  data: Array<Peso_Altura_INT>;
}

export function ListPesoAltura({ type, data }: Props) {
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

  return (
    <>
      <Row justify="space-around" style={Styles.head_table}>
        <Col span={17}>Fecha</Col>
        <Col span={3}>{type}</Col>
      </Row>
      {data.map((item, index) => (
        <Row justify="space-around" style={Styles.body_table} key={index}>
          <Col span={17}>{moment(item.fecha_seguimiento).format("LLL")}</Col>
          <Col span={3}>
            {type === "Peso" ? (
              <Tag style={{ fontSize: 19 }} color="gold">
                KLG: {item.peso}
              </Tag>
            ) : (
              <Tag style={{ fontSize: 19 }} color="gold">
                CM: {item.altura}
              </Tag>
            )}
          </Col>
        </Row>
      ))}
    </>
  );
}
