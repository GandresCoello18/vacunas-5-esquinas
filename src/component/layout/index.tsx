import { NavBarVertical } from "./navBarVertical";
import { Row, Col } from "antd";
import { NavBar } from "./navBar";
import React from "react";
import { Head } from "./head";

interface Prop {
  children: any;
  head_title: string;
}

export function Layout({ children, head_title }: Prop) {
  return (
    <>
      <Head title={head_title} />
      <Row justify="center" style={{ backgroundColor: "#001529" }}>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Row style={{ height: "100vh" }}>
        <Col span={3}>
          <NavBarVertical />
        </Col>
        <Col
          span={21}
          className="scroll"
          style={{ overflowY: "scroll", height: "100vh" }}
        >
          {children}
        </Col>
      </Row>
      <Row
        justify="center"
        style={{
          backgroundColor: "#001529",
          textAlign: "center",
          padding: 15,
          marginTop: 15,
        }}
      >
        <Col sm={20} md={10}>
          <h3 style={{ color: "#fff" }}>
            Centro de salud ( 5 esquinas ) del canton babahoyo
          </h3>
        </Col>
      </Row>
    </>
  );
}
