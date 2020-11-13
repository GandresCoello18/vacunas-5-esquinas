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

interface Props {
  thisPaciente: Paciente_INT;
  thisRepresentante: Representantes_INT | undefined;
}

export function CardDetallePaciente({
  thisPaciente,
  thisRepresentante,
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
            <Col span={3}>
              <Tag color="purple">
                Peso: <strong>{thisPaciente.peso}</strong> KLG
              </Tag>
            </Col>
            <Col span={3}>
              <Tag color="volcano">
                Altura: <strong>{thisPaciente.altura}</strong> CM
              </Tag>
            </Col>
          </Row>
          <br />
          <h4>Progreso</h4>
          <Progress percent={50} status="active" />
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
          <Button>
            <LineChartOutlined /> Estadisticas
          </Button>
        </Col>
      </Row>
      <Row justify="space-around" style={{ marginTop: 10 }}>
        <Col span={9}>
          <Button>
            <ExpandAltOutlined /> Peso y Altura
          </Button>
        </Col>
        <Col span={9}>
          <Button>
            <SolutionOutlined /> Mis Datos
          </Button>
        </Col>
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

      <Button
        style={{ position: "relative", width: "90%", bottom: 10, left: 20 }}
        danger
      >
        Eliminar
      </Button>
    </>
  );
}
