import { Button, Col, Form, Input, message, Row, Select } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePacientes } from "../../api/paciente";
import { setPacientes } from "../../redux/modulos/pacientes";
import { Paciente_INT, Representantes_INT } from "../../interface";
import { RootState, Dispatch } from "../../redux";

interface Props {
  paciente: Paciente_INT;
}

export function UpdateMisDatos({ paciente }: Props) {
  const [form] = Form.useForm();
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const { Option } = Select;

  const Representantes: Array<Representantes_INT> = useSelector(
    (state: RootState) => state.Representantes.Representante
  );

  const Paciente: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

  const send = async (data: any) => {
    const { nombres, apellidos, representante } = data;
    setIsLoading(true);

    try {
      const update = await UpdatePacientes(
        paciente.id_paciente,
        nombres,
        apellidos,
        representante
      );

      if (update.data.feeback) {
        message.error(update.data.feeback);
        return false;
      }

      if (update.data.removed) {
        dispatch(setPacientes([...update.data.paciente, ...Paciente]));
        message.success("Se actualizaron los datos del paciente");
      } else {
        message.error("Ocurrio un error al actualizar los datos");
      }
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
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
          <Input
            placeholder="Ingrese sus nombres."
            disabled={!isUpdate}
            defaultValue={paciente.nombres}
          />
        </Form.Item>
        <Form.Item
          name="apellidos"
          label="Apellidos"
          rules={[
            {
              required: true,
              message: "Ingrese sus Apellidos.",
            },
          ]}
        >
          <Input
            placeholder="Ingrese sus apellidos."
            disabled={!isUpdate}
            defaultValue={paciente.apellidos}
          />
        </Form.Item>
        <Form.Item
          name="representante"
          label="Representante"
          rules={[
            {
              required: true,
              message: "Selecciona el representante.",
            },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            defaultValue={paciente.id_representante}
            disabled={!isUpdate}
            placeholder="Selecciona el representante..."
          >
            {Representantes.map((representante) => (
              <Option value={representante.cedula}>
                {representante.nombres} {representante.apellidos}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Row justify="space-around">
            <Col span={10}>
              <Button
                block
                color="yellow"
                disabled={isUpdate}
                onClick={() => setIsUpdate(!isUpdate)}
              >
                Actualizar
              </Button>
            </Col>
            <Col span={10}>
              <Button
                htmlType="submit"
                block
                type="primary"
                disabled={!isUpdate}
                loading={isLoading}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
}
