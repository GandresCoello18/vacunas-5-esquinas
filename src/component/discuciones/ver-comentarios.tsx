import React, { useEffect, useState } from "react";
import { Alert, Avatar, Button, Col, Collapse, List, Row } from "antd";
import { useSelector } from "react-redux";
import { Comentario_Discucion_INT } from "../../interface";
import { RootState } from "../../redux";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  id_discucion_mencion: string;
}

export function VerComentariosMencion({ id_discucion_mencion }: Props) {
  const [isComent, setIsComent] = useState<boolean>(true);
  const { Panel } = Collapse;

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
                              <Button danger>
                                <DeleteOutlined />
                              </Button>
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
