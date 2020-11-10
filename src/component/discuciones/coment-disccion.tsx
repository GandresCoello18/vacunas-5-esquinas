import { Alert, Avatar, Button, Col, Divider, List, Row } from "antd";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../redux";
import { Link } from "react-router-dom";
import { Discucion_Menciones_INT } from "../../interface";
import { DOMAIN } from "../../config/domain";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { VerComentariosMencion } from "./ver-comentarios";
import { CommentForm } from "./coment-form";

interface Props {
  limit?: number;
  setSelectPaciente?: Function | any;
}

export function CommentDiscucion({ limit, setSelectPaciente }: Props) {
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
                        <Link
                          to="#"
                          onClick={() =>
                            setSelectPaciente(discucion.id_paciente)
                          }
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
                      <Button danger>
                        <DeleteOutlined />
                      </Button>
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
        ))}
      </List>

      {discuciones.length === 0 && (
        <Alert
          type="info"
          message="No hay datos de discuciones para mostrar...."
        />
      )}
    </>
  );
}
