import React, { useEffect, useState } from "react";
import { Row, Col, Button, Tag, Skeleton, Alert, Avatar, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { setPacientes } from "../../redux/modulos/pacientes";
import { Paciente_INT, Usuario_INT } from "../../interface";
import { DeleteOutlined, AuditOutlined } from "@ant-design/icons";
import { DOMAIN } from "../../config/domain";
import { DeletePacientes } from "../../api/paciente";

interface props {
  limit?: number;
  setIdPaciente?: Function | any;
}

export function TablePaciente({ limit, setIdPaciente }: props) {
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

  const [Paciente, setPaciente] = useState<Array<Paciente_INT>>([]);
  const PacienteReducer = useSelector(
    (state: RootState) => state.PacienteReducer
  );

  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

  useEffect(() => {
    if (limit) {
      setPaciente(PacienteReducer.Pacientes.splice(limit));
    } else {
      setPaciente(PacienteReducer.Pacientes);
    }
  }, [limit, PacienteReducer]);

  const deletePaciente = async (id_user: string) => {
    try {
      const eliminar = await DeletePacientes(id_user);

      if (eliminar.data.removed) {
        message.success("Se elimino el usuario");
        const index = PacienteReducer.Pacientes.findIndex(
          (item: Paciente_INT) => item.id_paciente === id_user
        );
        PacienteReducer.Pacientes.splice(index, 1);
        dispatch(setPacientes([...PacienteReducer.Pacientes]));
      } else {
        message.error("Ocurrio un error al eliminar el paciente");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Row justify="space-between" style={Styles.head_table}>
        <Col span={3}>Codigo</Col>
        <Col span={3}>Nombres</Col>
        <Col span={3}>Apellido</Col>
        <Col span={2}>Peso</Col>
        <Col span={2}>Altura</Col>
        <Col span={2}>Tempe</Col>
        <Col span={3}>{limit ? "Foto" : "Optiones"}</Col>
      </Row>
      {PacienteReducer.loading && <Skeleton />}
      {Paciente.map((item, index) => (
        <Row justify="space-between" style={Styles.body_table} key={index}>
          <Col span={3}>
            <Tag color="cyan">{item.codigo}</Tag>
          </Col>
          <Col span={3}>{item.nombres}</Col>
          <Col span={3}>{item.apellidos}</Col>
          <Col span={2}>
            <b>KLG: </b>
            {item.peso}
          </Col>
          <Col span={2}>
            <b>CM: </b> {item.altura}
          </Col>
          <Col span={2}>
            <b>GC: </b> {item.temperatura}
          </Col>
          <Col span={3}>
            {limit ? (
              <Avatar src={`${DOMAIN}/static/pacientes/${item.img}`} />
            ) : (
              <>
                {Session.isAdmin ? (
                  <>
                    <Button
                      danger
                      onClick={() => deletePaciente(item.id_paciente)}
                    >
                      <DeleteOutlined />
                    </Button>
                    &nbsp; &nbsp;
                  </>
                ) : (
                  ""
                )}
                <Button
                  type="primary"
                  onClick={() => setIdPaciente(item.id_paciente)}
                >
                  <AuditOutlined />
                </Button>
              </>
            )}
          </Col>
        </Row>
      ))}

      <br />

      <Row justify="center">
        <Col span={20}>
          {Paciente.length === 0 && (
            <Alert type="info" message="No hay datos que mostrar" />
          )}

          {limit && Paciente.length > 5 && (
            <Button type="dashed">Todo los Pacientes</Button>
          )}
        </Col>
      </Row>
    </>
  );
}
