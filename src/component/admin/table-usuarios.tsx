import {
  DeleteOutlined,
  StarOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Divider,
  message,
  Modal,
  Row,
  Select,
  Skeleton,
  Tag,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, PutRolUser, PutStatusser } from "../../api/usuarios";
import { Usuario_INT } from "../../interface";
import { RootState, Dispatch } from "../../redux";
import { SetUsuarios } from "../../redux/modulos/usuario";

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

  const dispatch: Dispatch = useDispatch();
  const { Option } = Select;

  const UsuarioReducer = useSelector(
    (state: RootState) => state.UsuarioReducer
  );

  const [modal, setModal] = useState<boolean>(false);
  const [modal2, setModal2] = useState<boolean>(false);
  const [loadStatus, setLoadStatus] = useState<boolean>(false);
  const [rol, setRol] = useState<number | boolean | undefined>(0);
  const [userId, setUserId] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const deleteUser = async (id_user: string) => {
    try {
      const eliminar = await DeleteUser(id_user);

      if (eliminar.data.feeback) {
        message.error(eliminar.data.feeback);
        return false;
      }

      if (eliminar.data.removed) {
        message.success("Usuario eliminado");
        const index = UsuarioReducer.Usuarios.findIndex(
          (item: Usuario_INT) => item.id_usuario === id_user
        );
        UsuarioReducer.Usuarios.splice(index, 1);
        dispatch(SetUsuarios([...UsuarioReducer.Usuarios]));
      } else {
        message.error("Ocurrio un error al elimnar este usuario");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateRol = async () => {
    try {
      const rol = await PutRolUser(userId);

      if (rol.data.update) {
        message.success("Se cambio el rol del ususario");
        dispatch(SetUsuarios([...UsuarioReducer.Usuarios, ...rol.data.user]));
        setModal(false);
      } else {
        message.error("Ocurrio un error al cambiar de rol");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateStatus = async () => {
    setLoadStatus(true);
    try {
      const resStatus = await PutStatusser(userId, status);

      if (resStatus.data.update) {
        message.success("El estado de la cuenta se actualizo");
        dispatch(
          SetUsuarios([...UsuarioReducer.Usuarios, ...resStatus.data.user])
        );
        setModal2(false);
        setLoadStatus(false);
      } else {
        message.error("Ocurrio un error al cambier el estado");
      }
    } catch (error) {
      message.error(error.message);
      setLoadStatus(false);
    }
  };

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Usuario</Col>
        <Col span={3}>Estado</Col>
        <Col span={5}>Email</Col>
        <Col span={4}>Se registro</Col>
        <Col span={3}>Foto</Col>
        <Col span={2}>Is Admin</Col>
        <Col span={4}>Opciones</Col>
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
                  : user.status === "bloqueado"
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
          <Col span={2}>
            {user.isAdmin ? (
              <Tag color="green">Si</Tag>
            ) : (
              <Tag color="red">No</Tag>
            )}
          </Col>
          <Col span={4}>
            <Button danger onClick={() => deleteUser(user.id_usuario)}>
              <DeleteOutlined />
            </Button>
            &nbsp; &nbsp;
            <Button
              type="primary"
              onClick={() => {
                setModal(true);
                setRol(user.isAdmin);
                setUserId(user.id_usuario);
              }}
            >
              <UserSwitchOutlined />
            </Button>
            &nbsp; &nbsp;
            <Button
              type="ghost"
              onClick={() => {
                setModal2(true);
                setUserId(user.id_usuario);
              }}
            >
              <StarOutlined />
            </Button>
          </Col>
        </Row>
      ))}

      {UsuarioReducer.Usuarios.length === 0 && (
        <Alert type="info" message="No hay datos para mostrar....." />
      )}

      <Modal
        title="Cambio de rol"
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Alert
          message="Estas a punto de cambiar el rol a este usuario"
          description={
            <>
              <p>Cada rol tiene permisos para realizar ciertas tareas.</p>
              <b>Admin</b>
              <ul>
                <li>Eliminar o bloquear cualquier usuario</li>
                <li>Eliminar cualquier registro</li>
              </ul>

              <br />

              <b>Personal</b>
              <ul>
                <li>Eliminar o actualizar sus propios registros</li>
              </ul>

              <br />

              <Button onClick={updateRol}>
                Cambiar a {rol ? "Personal" : "Administracion"}
              </Button>
            </>
          }
          type="info"
          showIcon
        />
      </Modal>

      <Modal
        title="Cambio de estado"
        visible={modal2}
        footer={false}
        onOk={() => setModal2(false)}
        onCancel={() => setModal2(false)}
      >
        <Select
          defaultValue="bloqueado"
          style={{ width: "100%" }}
          onChange={(value) => setStatus(value)}
        >
          <Option value="bloqueado">Bloquear</Option>
          <Option value="activo">Activar</Option>
        </Select>
        <Divider />
        <Button type="primary" loading={loadStatus} onClick={updateStatus}>
          Cambiar de estado
        </Button>
      </Modal>
    </>
  );
}
