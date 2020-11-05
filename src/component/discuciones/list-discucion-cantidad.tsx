import { Badge, Col, List, Row } from "antd";
import React from "react";

export function ListDiscucionCantidad() {
  const data = [
    "Racing car sprays crowd.",
    "Japanese princess to wed.",
    "Australian walks 100km after.",
    "Man charged over missing.",
  ];

  return (
    <>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Row justify="space-between">
              <Col span={17}>{item}</Col>
              <Col span={6}>
                <b style={{ float: "right" }}>
                  <Badge
                    className="site-badge-count-109"
                    count={109}
                    style={{ backgroundColor: "#52c41a" }}
                  />
                </b>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
}
