import React, { useEffect, useState } from "react";
import { Alert, Avatar, Button, Col, Collapse, List, message, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Comentario_Discucion_INT } from "../../interface";
import { RootState, Dispatch } from "../../redux";
import moment from "moment";
import { setComentarioDiscuciones } from "../../redux/modulos/comentario-discucion";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteComentarioDiscucion } from "../../api/comentario";

interface Props {
  id_discucion_mencion: string;
  isAdmin: boolean | number | undefined;
  id_usuario: string;
}

export function VerComentariosMencion({
  id_discucion_mencion,
  isAdmin,
  id_usuario,
}: Props) {
  const [isComent, setIsComent] = useState<boolean>(true);
  const { Panel } = Collapse;
  const dispatch: Dispatch = useDispatch();

  const Comentarios: Array<Comentario_Discucion_INT> = useSelector(
    (state: RootState) => state.ComentariosReducer.Comentarios_Discuciones
  );

  useEffect(() => {
    if (
      Comentarios.find(
        (coment) => coment.id_comentario_mencion === id_discucion_mencion
      )
    ) {
      setIsComent(false);
    }
  }, [Comentarios, id_discucion_mencion]);

  const deleteComentario = async (id_comentario: string) => {
    try {
      const eliminar = await DeleteComentarioDiscucion(id_comentario);

      if (eliminar.data.removed) {
        message.success("Se elimino el comentario");
        const index = Comentarios.findIndex(
          (item: Comentario_Discucion_INT) =>
            item.id_comentario_mencion === id_comentario
        );
        Comentarios.splice(index, 1);
        dispatch(setComentarioDiscuciones([...Comentarios]));
      } else {
        message.error("Ocurrio un error al momento de eliminar el comentario");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Collapse ghost>
        <Panel header="Ver Comentarios" key="1">
          <List itemLayout="horizontal">
            {Comentarios.map(
              (coment) =>
                coment.id_discucion_mencion === id_discucion_mencion && (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={coment.photoURL} />}
                      title={<strong>{coment.userName}</strong>}
                      description={
                        <>
                          <Row justify="space-around">
                            <Col span={18}>
                              <p>{coment.comentario}</p>
                              <u>
                                {moment(coment.fecha_comentario).format(
                                  "LL , LTS"
                                )}
                              </u>
                            </Col>
                            <Col span={3}>
                              {isAdmin ? (
                                <Button
                                  danger
                                  onClick={() =>
                                    deleteComentario(
                                      coment.id_comentario_mencion
                                    )
                                  }
                                >
                                  <DeleteOutlined />
                                </Button>
                              ) : (
                                coment.id_usuario === id_usuario && (
                                  <Button
                                    danger
                                    onClick={() =>
                                      deleteComentario(
                                        coment.id_comentario_mencion
                                      )
                                    }
                                  >
                                    <DeleteOutlined />
                                  </Button>
                                )
                              )}
                            </Col>
                          </Row>
                        </>
                      }
                    />
                  </List.Item>
                )
            )}
          </List>

          {isComent && (
            <Alert type="info" message="No hay comentarios para mostrar....." />
          )}
        </Panel>
      </Collapse>
    </>
  );
}
