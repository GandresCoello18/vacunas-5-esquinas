import { Alert, List } from "antd";
import React, { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { Discucion_Menciones_INT } from "../../interface";

interface Props {
  limit?: number;
  setSelectPaciente?: Function | any;
  Discuciones: Array<Discucion_Menciones_INT>;
}

export function CommentDiscucion({
  limit,
  setSelectPaciente,
  Discuciones,
}: Props) {
  const [discuciones, setDiscuciones] = useState<
    Array<Discucion_Menciones_INT>
  >([]);

  useEffect(() => {
    if (limit) {
      setDiscuciones(Discuciones.splice(limit));
    } else {
      setDiscuciones(Discuciones);
    }
  }, [limit, Discuciones]);

  return (
    <>
      <List itemLayout="horizontal">
        {discuciones.map((discucion) => (
          <ListItem
            discucion={discucion}
            setSelectPaciente={setSelectPaciente}
          />
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
