import React, { useEffect, useState } from "react";
import { Row, Col, Button, Alert, Tag, Skeleton, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Representantes_INT, Usuario_INT } from "../../interface";
import { RootState, Dispatch } from "../../redux";
import { SetRepresentante } from "../../redux/modulos/representante";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import { DeleteRepresentante } from "../../api/representante";

interface props {
  limit?: number;
  setSelectRepresentante?: Function | any;
}

export function TableRepresentante({ limit, setSelectRepresentante }: props) {
  const Styles = {
    head_table: {
      backgroundColor: "#001529",
      color: "#fff",
      padding: 20,
    },
    body_table: {
      backgroundColor: "#fff",
      color: "#001529",
      padding: 20,
      border: 2,
      borderWidth: 2,
      borderColor: "#cdcdcd",
      borderStyle: "solid",
    },
  };

  const dispatch: Dispatch = useDispatch();

  const [Representante, setRepresentanteState] = useState<
    Array<Representantes_INT>
  >([]);
  const RepresentanteReducer = useSelector(
    (state: RootState) => state.Representantes
  );

  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

  useEffect(() => {
    if (limit) {
      setRepresentanteState(RepresentanteReducer.Representante.splice(limit));
    } else {
      setRepresentanteState(RepresentanteReducer.Representante);
    }
  }, [limit, RepresentanteReducer]);

  const eliminar_repre = async (cedula: number) => {
    try {
      const eliminar = await DeleteRepresentante(cedula);

      if (eliminar.data.removed) {
        message.success("Se elimino el representante");
        const index = RepresentanteReducer.Representante.findIndex(
          (item: Representantes_INT) => item.cedula === cedula
        );
        RepresentanteReducer.Representante.splice(index, 1);
        dispatch(SetRepresentante([...RepresentanteReducer.Representante]));
      } else {
        message.error("Ocurrio un error en eliminar el representante");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}># Cedula</Col>
        <Col span={3}>Sexo</Col>
        <Col span={3}>Nombres</Col>
        <Col span={3}>Apellidos</Col>
        <Col span={3}>Optiones</Col>
      </Row>
      {RepresentanteReducer.loading && <Skeleton />}
      {Representante.map((item: Representantes_INT, index: number) => (
        <Row justify="space-between" style={Styles.body_table} key={index}>
          <Col span={3}>
            <Tag color="magenta" style={{ fontSize: 17 }}>
              {item.cedula}
            </Tag>
          </Col>
          <Col span={3}>{item.sexo}</Col>
          <Col span={3}>{item.nombres}</Col>
          <Col span={3}>{item.apellidos}</Col>
          <Col span={3}>
            {Session.isAdmin ? (
              <Button danger onClick={() => eliminar_repre(item.cedula)}>
                <DeleteOutlined />
              </Button>
            ) : (
              ""
            )}
            {!limit && (
              <>
                &nbsp; &nbsp;
                <Button
                  type="ghost"
                  onClick={() => setSelectRepresentante(item.cedula)}
                >
                  <UserAddOutlined />
                </Button>
              </>
            )}
          </Col>
        </Row>
      ))}

      <br />

      <Row justify="center">
        <Col span={20}>
          {Representante.length === 0 && (
            <Alert type="info" message="No hay datos que mostrar" />
          )}

          {limit && Representante.length > 5 && (
            <Button type="dashed">Todo los Representantes</Button>
          )}
        </Col>
      </Row>
    </>
  );
}
