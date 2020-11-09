import { Avatar, Button, Col, List, Row } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../redux";
import { Link } from "react-router-dom";
import { Discucion_Menciones_INT } from "../../interface";
import { DOMAIN } from "../../config/domain";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  limit?: number;
}

export function CommentDiscucion({ limit }: Props) {
  const [discuciones, setDiscuciones] = useState<
    Array<Discucion_Menciones_INT>
  >([]);
  const DiscucionReducer = useSelector(
    (state: RootState) => state.DiscucionesReducer
  );

  useEffect(() => {
    if (limit) {
      setDiscuciones(DiscucionReducer.Discuciones.splice(limit));
    } else {
      setDiscuciones(DiscucionReducer.Discuciones);
    }
  }, [limit, DiscucionReducer]);

  return (
    <>
      <List itemLayout="horizontal">
        {discuciones.map((discucion) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={discucion.photoURL} />}
              title={
                <>
                  <strong>{discucion.userName}</strong> -{" "}
                  <u>{discucion.asunto}</u>
                </>
              }
              description={
                <>
                  <Row justify="space-around">
                    <Col span={19}>
                      <p>{discucion.contenido}</p>
                      <p>
                        <Link to={`/${discucion.id_paciente}`}>
                          <Avatar
                            src={`${DOMAIN}/static/pacientes/${discucion.img}`}
                          />
                          &nbsp;
                          {discucion.nombres} {discucion.apellidos} -{" "}
                          <u>{discucion.codigo}</u>
                        </Link>
                      </p>
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
        ))}
      </List>
    </>
  );
}
