import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { CreateSeguimiento } from "../../api/seguimineto";
import { Paciente_INT, Peso_Altura_INT } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { setPacientes } from "../../redux/modulos/pacientes";

interface Props {
  id_paciente: string;
  setIsReload: Function;
}

export function FormPesoAltura({ id_paciente, setIsReload }: Props) {
  const dispatch: Dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );

  const send = async (data: any) => {
    setIsLoading(true);
    const { peso, altura } = data;

    try {
      const seguimiento: Peso_Altura_INT = {
        id_seguimiento: "",
        peso,
        altura,
        id_paciente,
      };

      const resPaciente = await CreateSeguimiento(seguimiento);
      dispatch(setPacientes([...pacientes, ...resPaciente.data]));
      message.success("Se registro el seguimiento en crecimiento");
      form.resetFields();
      setIsReload(true);
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
        <Form.Item
          name="peso"
          label="Peso por kilogramo"
          rules={[
            {
              required: true,
              message: "Ingrese el peso en kilogramo.",
            },
          ]}
        >
          <Input type="number" placeholder="Ingrese el peso en kilogramo." />
        </Form.Item>
        <Form.Item
          name="altura"
          label="Altura por centimetro"
          rules={[
            {
              required: true,
              message: "Ingrese la altura por centimetro.",
            },
          ]}
        >
          <Input
            type="number"
            placeholder="Ingrese la altura por centimetro."
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" loading={isLoading}>
            Guardar registro
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
