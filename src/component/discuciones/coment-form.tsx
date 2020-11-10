import React, { useState } from "react";
import { WechatOutlined } from "@ant-design/icons";
import { createComentario } from "../../api/comentario";
import { Button, Form, Input, message } from "antd";
import { Dispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { setComentarioDiscuciones } from "../../redux/modulos/comentario-discucion";
import Cookies from "js-cookie";
import { Comentario_Discucion_INT } from "../../interface";

interface Props {
  id_discucion_mencion: string;
}

export function CommentForm({ id_discucion_mencion }: Props) {
  const dispatch: Dispatch = useDispatch();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCommnet, setIsComment] = useState<boolean>(true);

  const Comentarios: Array<Comentario_Discucion_INT> = useSelector(
    (state: RootState) => state.ComentariosReducer.Comentarios_Discuciones
  );

  const send = async (data: any) => {
    const { comentario } = data;
    setIsLoading(true);

    try {
      const resComent = await createComentario(
        comentario,
        Cookies.get("id-user"),
        id_discucion_mencion
      );

      message.success("Su comentario se agrego con exito");
      form.resetFields();
      setIsLoading(false);

      dispatch(setComentarioDiscuciones([...Comentarios, ...resComent.data]));
    } catch (error) {
      message.error(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isCommnet ? (
        <Button
          type="dashed"
          onClick={() => setIsComment(false)}
          icon={<WechatOutlined />}
        >
          Comentar
        </Button>
      ) : (
        <>
          <Form form={form} onFinish={send} name="dynamic_rule">
            <Form.Item
              name="comentario"
              rules={[
                {
                  required: true,
                  message: "Escribe el contendio de tu comentario.",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Escribe el contendio de tu comentario."
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" loading={isLoading}>
                Publicar
              </Button>
              &nbsp; &nbsp;
              <Button danger onClick={() => setIsComment(true)}>
                Cancelar
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
}
