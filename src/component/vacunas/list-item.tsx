import { Avatar, Divider, List } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Vacunas_INT, Vacuna_Paciente_Relacionado_INT } from "../../interface";
import { RootState } from "../../redux";

interface Props {
  vacuna_paciente: Vacuna_Paciente_Relacionado_INT;
}

export function ListItemVacunas({ vacuna_paciente }: Props) {
  const vacunas: Array<Vacunas_INT> = useSelector(
    (state: RootState) => state.VacunasReducer.Vacunas
  );

  return (
    <>
      <List itemLayout="horizontal">
        {vacunas.map(
          (vacuna) =>
            vacuna.vacuna_name === vacuna_paciente.vacuna_name && (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={vacuna_paciente.photoURL} />}
                  title={<b>{vacuna_paciente.userName}</b>}
                  description={
                    <>
                      <p>{vacuna_paciente.observaciones}</p>
                      <strong>
                        {moment(vacuna_paciente.fecha_vacuna).format("LLL")}
                      </strong>
                    </>
                  }
                />
              </List.Item>
            )
        )}
      </List>
      <Divider />
    </>
  );
}
