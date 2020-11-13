import { Button, Form, Input, message, Select } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RegisterVacunaPaciente } from "../../api/vacuna-paciente";
import {
  Paciente_INT,
  Vacunas_INT,
  Vacuna_Paciente_INT,
} from "../../interface";
import { RootState } from "../../redux";

interface Props {
  id_paciente?: string;
}

export function FormAddVacuna({ id_paciente }: Props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;

  const [isLoading, setiIsLoading] = useState<boolean>(false);

  const vacunas: Array<Vacunas_INT> = useSelector(
    (state: RootState) => state.VacunasReducer.Vacunas
  );
  const Pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

  const send = async (data: any) => {
    setiIsLoading(true);
    const { vacuna, paciente, observaciones } = data;

    try {
      const pv: Vacuna_Paciente_INT = {
        id_vacuna_paciente: "",
        id_vacuna: vacuna,
        id_paciente: paciente ? paciente : id_paciente,
        observaciones,
        id_usuario: Cookies.get("id-user"),
      };

      await RegisterVacunaPaciente(pv);

      form.resetFields();
      message.success("Se guardo el registro con exito");
    } catch (error) {
      message.error(error.message);
    }

    setiIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
        <Form.Item
          name="vacuna"
          label="Vacunas"
          rules={[
            {
              required: true,
              message: "Seleccione la vacuna.",
            },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Seleccione el tipo de vacuna"
          >
            {vacunas.map((vacuna) => (
              <Option value={vacuna.id_vacuna}>{vacuna.vacuna_name}</Option>
            ))}
          </Select>
        </Form.Item>
        {!id_paciente && (
          <Form.Item
            name="paciente"
            label="paciente"
            rules={[
              {
                required: true,
                message: "Seleccione la vacuna.",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="Seleccion el paciente"
            >
              {Pacientes.map((paciente) => (
                <Option value={paciente.id_paciente}>
                  {paciente.nombres} {paciente.apellidos}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="observaciones"
          label="Observaciones"
          rules={[
            {
              required: false,
              message: "Escriba algunas observaciones.",
            },
          ]}
        >
          <TextArea placeholder="Escriba algunas observaciones" rows={4} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" block type="primary" loading={isLoading}>
            Guardar registro
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
