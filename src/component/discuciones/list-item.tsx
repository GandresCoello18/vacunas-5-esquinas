import React from "react";
import { Avatar, Button, Col, Divider, List, Row } from "antd";
import { DOMAIN } from "../../config/domain";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { VerComentariosMencion } from "./ver-comentarios";
import { CommentForm } from "./coment-form";
import { Discucion_Menciones_INT } from "../../interface";

interface Props {
  discucion: Discucion_Menciones_INT;
  setSelectPaciente?: Function | any;
}

export function ListItem({ discucion, setSelectPaciente }: Props) {
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
    </>
  );
}
