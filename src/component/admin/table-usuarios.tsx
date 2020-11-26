import { UserAddOutlined, UserSwitchOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Row, Skeleton, Tag } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Usuario_INT } from "../../interface";
import { RootState } from "../../redux";

export function TablesUsuario() {
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

  const UsuarioReducer = useSelector(
    (state: RootState) => state.UsuarioReducer
  );

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Usuario</Col>
        <Col span={3}>Estado</Col>
        <Col span={5}>Email</Col>
        <Col span={4}>Se registro</Col>
        <Col span={3}>Foto</Col>
        <Col span={3}>Is Admin</Col>
        <Col span={3}>Opciones</Col>
      </Row>
      {UsuarioReducer.loading && <Skeleton />}
      {UsuarioReducer.Usuarios.map((user: Usuario_INT) => (
        <Row
          justify="space-between"
          style={Styles.body_table}
          key={user.id_usuario}
        >
          <Col span={3}>{user.userName}</Col>
          <Col span={3}>
            <Tag
              color={
                user.status === "registrado"
                  ? "warning"
                  : user.status === "Bloqueado"
                  ? "red"
                  : "success"
              }
              style={{ fontSize: 18 }}
            >
              {user.status}
            </Tag>
          </Col>
          <Col span={5}>{user.email}</Col>
          <Col span={4}>{moment(user.fecha_registro).format("LL")}</Col>
          <Col span={3}>
            <Avatar src={user.photoURL} />
          </Col>
          <Col span={3}>
            {user.isAdmin ? (
              <Tag color="green">Si</Tag>
            ) : (
              <Tag color="red">No</Tag>
            )}
          </Col>
          <Col span={3}>
            <Button danger>
              <UserAddOutlined />
            </Button>
            &nbsp; &nbsp;
            <Button type="primary">
              <UserSwitchOutlined />
            </Button>
          </Col>
        </Row>
      ))}

      {UsuarioReducer.Usuarios.length === 0 && (
        <Alert type="info" message="No hay datos para mostrar....." />
      )}
    </>
  );
}
