import React from "react";
import { Avatar, Button, Col, Divider, List, message, Row } from "antd";
import { DOMAIN } from "../../config/domain";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { VerComentariosMencion } from "./ver-comentarios";
import { CommentForm } from "./coment-form";
import { setDiscuciones } from "../../redux/modulos/discucion";
import { Discucion_Menciones_INT, Usuario_INT } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { EliminarMencion } from "../../api/discucion";

interface Props {
  discucion: Discucion_Menciones_INT;
  setSelectPaciente?: Function | any;
}

export function ListItem({ discucion, setSelectPaciente }: Props) {
  const dispatch: Dispatch = useDispatch();
  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );
  const Discuciones: Array<Discucion_Menciones_INT> = useSelector(
    (state: RootState) => state.DiscucionesReducer.Discuciones
  );

  const deleteDiscucion = async (id_discucion: string) => {
    try {
      const eliminar = await EliminarMencion(id_discucion);

      if (eliminar.data.removed) {
        const index = Discuciones.findIndex(
          (item: Discucion_Menciones_INT) => item.id_discucion === id_discucion
        );
        Discuciones.splice(index, 1);
        dispatch(setDiscuciones([...Discuciones]));
        message.success("Se elimino la discucion");
      } else {
        message.error("Ocurrio un error al eliminar la discucion");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={discucion.photoURL} />}
          title={
            <>
              <strong>{discucion.userName}</strong> - <u>{discucion.asunto}</u>
            </>
          }
          description={
            <>
              <Row justify="space-around">
                <Col span={19}>
                  <p>{discucion.contenido}</p>
                  <p>
                    <Link
                      to="#"
                      onClick={() => setSelectPaciente(discucion.id_paciente)}
                    >
                      <Avatar
                        src={`${DOMAIN}/static/pacientes/${discucion.img}`}
                      />
                      &nbsp;
                      {discucion.nombres} {discucion.apellidos} -{" "}
                      <u>{discucion.codigo}</u>
                    </Link>
                  </p>
                  <p>{moment(discucion.fecha_discucion).format("LL")}</p>
                </Col>
                <Col span={3}>
                  {Session.isAdmin ? (
                    <Button
                      danger
                      onClick={() => deleteDiscucion(discucion.id_discucion)}
                    >
                      <DeleteOutlined />
                    </Button>
                  ) : (
                    discucion.id_usuario === Session.id_usuario && (
                      <Button
                        danger
                        onClick={() => deleteDiscucion(discucion.id_discucion)}
                      >
                        <DeleteOutlined />
                      </Button>
                    )
                  )}
                </Col>
              </Row>
              <Divider />

              <VerComentariosMencion
                id_discucion_mencion={discucion.id_discucion_mencion}
              />
              <CommentForm
                id_discucion_mencion={discucion.id_discucion_mencion}
              />
            </>
          }
        />
      </List.Item>
    </>
  );
}
