import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Alert,
  DatePicker,
  Divider,
  message,
} from "antd";
import { TablePaciente } from "./table-paciente";
import { TableRepresentante } from "../representante/table-representante";
import { CreateRepresent } from "../../api/representante";
import { Paciente_INT, Representantes_INT } from "../../interface";
import { Dispatch, RootState } from "../../redux";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setRepresentante } from "../../redux/modulos/representante";
import { setPacientes } from "../../redux/modulos/pacientes";
import { CreatePaciente } from "../../api/paciente";

export function IngresoPaciente(): JSX.Element {
  const styles = {
    box: {
      backgroundColor: "#fff",
      padding: 10,
      marginTop: 15,
      borderRadius: 10,
    },
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingRepresent, setIsLoadingRepresent] = useState<boolean>(false);
  const [StateRepresent, setStateRepresent] = useState<
    Array<Representantes_INT>
  >([]);
  const [SelectRepre, setSelectRepre] = useState<number>(0);

  const Representante: Array<Representantes_INT> = useSelector(
    (state: RootState) => state.Representantes.Representante
  );

  const Pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

  const [formPaciente] = Form.useForm();
  const [formRepresentante] = Form.useForm();
  const dispatch: Dispatch = useDispatch();

  const { Option } = Select;

  useEffect(() => {
    setStateRepresent(Representante);
  }, [Representante]);

  const sendPaciente = async (data: any) => {
    const { altura, apellidos, nacimiento, nombres, peso } = data;
    setIsLoading(true);

    const obj: Paciente_INT = {
      id_paciente: "",
      nombres,
      apellidos,
      altura,
      peso,
      nacimiento: moment(nacimiento._d).format(),
      codigo: "",
      id_representante: SelectRepre,
    };

    const img: any = document.getElementById("foto");

    const form: FormData = new FormData();
    form.append("id_paciente", obj.id_paciente);
    form.append("nombres", obj.nombres);
    form.append("apellidos", obj.apellidos);
    form.append("altura", obj.altura);
    form.append("peso", obj.peso);
    form.append("nacimiento", obj.nacimiento);
    form.append("codigo", obj.codigo);
    form.append("id_representante", obj.id_representante);
    form.append("img", img.files[0]);

    if (SelectRepre) {
      const resPaciente = await CreatePaciente(form);

      if (resPaciente.data.feeback) {
        message.error(resPaciente.data.feeback);
      } else {
        dispatch(setPacientes([...Pacientes, ...resPaciente.data]));
        formPaciente.resetFields();
      }
    } else {
      message.error("Seleccione algun representante");
    }

    setIsLoading(false);
  };

  const sendRepresent = async (data: any) => {
    setIsLoadingRepresent(true);
    const { Cedula, Sexo, Nombres, Apellidos } = data;

    try {
      const obj: Representantes_INT = {
        cedula: Cedula,
        sexo: Sexo,
        nombres: Nombres,
        apellidos: Apellidos,
      };

      const resRepre = await CreateRepresent(obj);

      if (resRepre.data.feeback) {
        message.error(resRepre.data.feeback);
      } else {
        message.success(
          `Se registro el representante con la CI: ${obj.cedula}`
        );
        dispatch(setRepresentante([...Representante, ...resRepre.data]));
        formRepresentante.resetFields();
      }
    } catch (error) {
      message.error(error.message);
    }

    setIsLoadingRepresent(false);
  };

  const searchRepresent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateRepresent(
      Representante.filter(
        (item) => item.cedula.toString().indexOf(event.target.value) !== -1
      )
    );
  };

  return (
    <>
      <Row justify="space-around">
        <Col style={styles.box} xs={20} md={11}>
          <h3 style={{ textAlign: "center", padding: 10 }}>Paciente</h3>
          <Form form={formPaciente} onFinish={sendPaciente} name="dynamic_rule">
            <Form.Item
              name="nombres"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: "Ingrese sus Nombres.",
                },
              ]}
            >
              <Input placeholder="Ingrese sus nombres." />
            </Form.Item>
            <Form.Item
              label="Apellidos"
              name="apellidos"
              rules={[
                {
                  required: true,
                  message: "Escriba los apellidos.",
                },
              ]}
            >
              <Input placeholder="Ingrese los apellidos." />
            </Form.Item>
            <Divider />
            <h3 style={{ textAlign: "center" }}>Representantes</h3>
            <Row justify="space-around">
              <Col span={12}>
                <Select
                  defaultValue="Seleccionar...."
                  style={{ width: "100%" }}
                  onChange={(value) => setSelectRepre(Number(value))}
                >
                  {StateRepresent.map((represent: Representantes_INT) => (
                    <Option value={represent.cedula}>
                      {represent.nombres} {represent.apellidos} -{" "}
                      {represent.cedula}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={6}>
                <Input
                  placeholder="Cedula del representante"
                  onChange={searchRepresent}
                />
              </Col>
            </Row>
            <Divider />
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  name="peso"
                  label="Peso"
                  rules={[
                    {
                      required: true,
                      message: "Escriba el peso.",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Ingrese el peso." />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="altura"
                  label="Altura"
                  rules={[
                    {
                      required: true,
                      message: "Escriba la altura.",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Ingrese la altura." />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="space-around">
              <Col>
                <Form.Item
                  name="nacimiento"
                  label="Nacimiento"
                  rules={[
                    {
                      required: true,
                      message: "Escriba la altura.",
                    },
                  ]}
                >
                  <DatePicker placeholder="Nacimiento" />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  name="foto"
                  label="Fotografia"
                  rules={[
                    {
                      required: true,
                      message: "Suba una fotografia.",
                    },
                  ]}
                >
                  <input type="file" id="foto" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button htmlType="submit" type="primary" loading={isLoading}>
                  Guardar paciente
                </Button>
              </Col>
            </Row>
            <br />
          </Form>
          <Alert
            type="info"
            message="Estos datos deben de coincidir con la partida de nacimiento."
          />
        </Col>
        <Col style={styles.box} xs={20} md={11}>
          <h3 style={{ textAlign: "center", padding: 10 }}>
            Pacientes reciente
          </h3>
          <TablePaciente limit={1} />
        </Col>
      </Row>
      <br />
      <Row justify="space-around">
        <Col style={styles.box} xs={20} md={11}>
          <h3 style={{ textAlign: "center", padding: 10 }}>Representante</h3>
          <Form
            form={formRepresentante}
            onFinish={sendRepresent}
            name="dynamic_rule"
          >
            <Row justify="space-around">
              <Col span={10}>
                <Form.Item
                  label="Cedula"
                  name="Cedula"
                  rules={[
                    {
                      required: true,
                      message: "Escribe el numero de identificacion.",
                    },
                  ]}
                >
                  <Input placeholder="Inserte el numero de indentificacion." />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="Sexo"
                  label="Sexo"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione el sexo.",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="Masculino">Masculino</Select.Option>
                    <Select.Option value="Femenino">Femenino</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="Nombres"
              label="Nombres"
              rules={[
                {
                  required: true,
                  message: "Escriba los nombres.",
                },
              ]}
            >
              <Input placeholder="Escriba los nombres." />
            </Form.Item>
            <Form.Item
              label="Apellidos"
              name="Apellidos"
              rules={[
                {
                  required: true,
                  message: "Escriba los apellidos.",
                },
              ]}
            >
              <Input placeholder="Escriba los apellidos." />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoadingRepresent}
              >
                Guardar representante
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col style={styles.box} xs={20} md={12}>
          <h3 style={{ textAlign: "center", padding: 10 }}>
            Representante recientes
          </h3>
          <TableRepresentante limit={0} />
        </Col>
      </Row>
    </>
  );
}
