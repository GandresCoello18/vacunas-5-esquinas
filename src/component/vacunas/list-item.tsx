import { Avatar, Col, Divider, List, Row, Tag } from "antd";
import moment from "moment";
import React from "react";
import { Vacuna_Paciente_Relacionado_INT } from "../../interface";

interface Props {
  list: Array<Vacuna_Paciente_Relacionado_INT>;
}

export function ListItemVacunas({ list }: Props) {
  return (
    <>
      <List itemLayout="horizontal">
        {list.map((list) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={list.photoURL} />}
              title={<b>{list.userName}</b>}
              description={
                <>
                  <p>
                    {list.observaciones !== "Sin observaciones" ? (
                      list.observaciones
                    ) : (
                      <Tag color="pink">{list.observaciones}</Tag>
                    )}
                  </p>
                  <Row justify="start">
                    <Col span={4}>
                      <Tag color="purple">
                        Peso: <strong>{list.peso ? list.peso : 0}</strong> KLG
                      </Tag>
                    </Col>
                    <Col span={4}>
                      <Tag color="volcano">
                        Altura: <strong>{list.altura ? list.altura : 0}</strong>{" "}
                        CM
                      </Tag>
                    </Col>
                    <Col span={4}>
                      <Tag color="processing">
                        Temperatura:{" "}
                        <strong>
                          {list.temperatura ? list.temperatura : 0}
                        </strong>{" "}
                        GC
                      </Tag>
                    </Col>
                  </Row>
                  <br />
                  <strong>{moment(list.fecha_vacuna).format("LLL")}</strong>
                </>
              }
            />
          </List.Item>
        ))}
      </List>
      <Divider />
    </>
  );
}
