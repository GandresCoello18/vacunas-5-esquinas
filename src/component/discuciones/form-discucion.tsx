import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { Form, Input, Button, Mentions, message } from "antd";
import {
  Discucion_INT,
  Discucion_Menciones_INT,
  Paciente_INT,
  Usuario_INT,
} from "../../interface";
import { createDiscucion } from "../../api/discucion";
import { setDiscuciones } from "../../redux/modulos/discucion";
import { ArrayMencion } from "../../hooks/mencion-array";

export function FromDiscucion() {
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Option } = Mentions;

  const Pacientes: Array<Paciente_INT> = useSelector(
    (state: RootState) => state.PacienteReducer.Pacientes
  );
  const Discuciones: Array<Discucion_Menciones_INT> = useSelector(
    (state: RootState) => state.DiscucionesReducer.Discuciones
  );
  const Session: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

  const send = async (data: any) => {
    const { Asunto, menciones, mensaje } = data;

    setIsLoading(true);

    const discucion: Discucion_INT = {
      id_discucion: "",
      asunto: Asunto,
      contenido: mensaje,
      pacientes: ArrayMencion(menciones),
      id_usuario: Session.id_usuario,
    };

    try {
      const resDiscucion = await createDiscucion(discucion);
      message.success(
        "Su menjase se envio correctamente, ver en la seccion de discuciones."
      );
      form.resetFields();
      dispatch(setDiscuciones([...Discuciones, ...resDiscucion.data]));
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} onFinish={send} name="dynamic_rule">
        <Form.Item
          name="Asunto"
          rules={[
            {
              required: true,
              message: "Falta escribir el asunto del comentario.",
            },
          ]}
        >
          <Input type="text" placeholder="Asunto de su comentario" />
        </Form.Item>
        <Form.Item
          name="menciones"
          rules={[
            {
              required: true,
              message: "Falta mencionar a algun paciente.",
            },
          ]}
        >
          <Mentions
            style={{ width: "100%" }}
            placeholder="Menciona algun paciente"
            defaultValue={Pacientes.length > 0 ? Pacientes[0].codigo : ""}
          >
            {Pacientes.map((paciente) => (
              <Option value={paciente.codigo}>
                {paciente.nombres} {paciente.apellidos}
              </Option>
            ))}
          </Mentions>
        </Form.Item>
        <Form.Item
          name="mensaje"
          rules={[
            {
              required: true,
              message: "Falta escribir el contenido del mensaje.",
            },
          ]}
        >
          <TextArea placeholder="Escriba el contenido del mensaje" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" block loading={isLoading} type="primary">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
