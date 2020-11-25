import { Avatar, Divider, List, Tag } from "antd";
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
