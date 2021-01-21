import React from "react";
import { Row, Col, Progress, Button, Divider, Tag } from "antd";
import { DOMAIN } from "../../config/domain";
import {
  CommentOutlined,
  EditOutlined,
  ExpandAltOutlined,
  LineChartOutlined,
  SolutionOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Paciente_INT, Representantes_INT } from "../../interface";
import { ModalBasic } from "../layout/modal";
import { FormAddVacuna } from "../vacunas/form-add-vacuna";
import { FormPesoAltura } from "./form-peso-altura";
import { UpdateMisDatos } from "./update-mis-datos";

interface Props {
  thisPaciente: Paciente_INT;
  setIsReload?: Function | any;
  thisRepresentante: Representantes_INT | undefined;
  isAdmin?: number | boolean | undefined;
}

export function CardDetallePaciente({
  thisPaciente,
  setIsReload,
  thisRepresentante,
  isAdmin,
}: Props) {
  return (
    <>
      <Row justify="center">
        <Col span={11}>
          <img
            style={{ borderRadius: "50%" }}
            alt="avatar paciente"
            width={200}
            src={`${DOMAIN}/static/pacientes/${thisPaciente.img}`}
          />
        </Col>
        <Col span={20}>
          <h2 style={{ textAlign: "center" }}>
            {thisPaciente.nombres} {thisPaciente.apellidos}
          </h2>
          <br />
          <Row justify="space-around">
            <Col span={4}>
              <Tag color="purple">
                Peso: <strong>{thisPaciente.peso}</strong> KLG
              </Tag>
            </Col>
            <Col span={4}>
              <Tag color="volcano">
                Altura: <strong>{thisPaciente.altura}</strong> CM
              </Tag>
            </Col>
            <Col span={4}>
              <Tag color="processing">
                Tempert: <strong>{thisPaciente.temperatura}</strong> GC
              </Tag>
            </Col>
          </Row>
          <br />
        </Col>
      </Row>
      <br />
      <Row justify="space-around">
        <Col span={9}>
          <ModalBasic
            button="Agregar Vacuna"
            titleModal="Agregar Vacuna"
            icon={<EditOutlined />}
          >
            <FormAddVacuna id_paciente={thisPaciente.id_paciente} />
          </ModalBasic>
        </Col>
        <Col span={9}>
          <Link to={`/mis-menciones/${thisPaciente.id_paciente}`}>
            <Button>
              <CommentOutlined /> Menciones
            </Button>
          </Link>
        </Col>
      </Row>
      <Row justify="space-around" style={{ marginTop: 10 }}>
        <Col span={9}>
          <Link to={`/mis-vacunas/${thisPaciente.id_paciente}`}>
            <Button>
              <EditOutlined /> Mis Vacunas
            </Button>
          </Link>
        </Col>
        <Col span={9}>
          <Link to={`/mis-estadisticas/${thisPaciente.id_paciente}`}>
            <Button>
              <LineChartOutlined /> Estadisticas
            </Button>
          </Link>
        </Col>
      </Row>
      <Row justify="space-around" style={{ marginTop: 10 }}>
        <Col span={9}>
          <ModalBasic
            button="Peso y Altura"
            titleModal="Peso y Altura"
            icon={<ExpandAltOutlined />}
          >
            <FormPesoAltura
              setIsReload={setIsReload}
              id_paciente={thisPaciente.id_paciente}
            />
          </ModalBasic>
        </Col>
        {isAdmin ? (
          <Col span={9}>
            <ModalBasic
              button="Mis Datos"
              titleModal="Mis Datos"
              icon={<SolutionOutlined />}
            >
              <UpdateMisDatos paciente={thisPaciente} />
            </ModalBasic>
          </Col>
        ) : (
          ""
        )}
      </Row>
      <Divider />
      {thisRepresentante !== undefined && (
        <>
          <h3>
            Su representante:{" "}
            <Link to="/">
              <Tag color="green" style={{ fontSize: 16 }}>
                <UserSwitchOutlined /> {thisRepresentante?.nombres}{" "}
                {thisRepresentante?.apellidos}
              </Tag>
            </Link>
          </h3>

          <br />
        </>
      )}
    </>
  );
}
