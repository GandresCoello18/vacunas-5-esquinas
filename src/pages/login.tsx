import React, { useState } from "react";
import { Head } from "../component/layout/head";
import { Row, Col, Button, Input, Form, message, Alert, Spin } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { doGoogleLoginAction, loGOutSession } from "../redux/modulos/session";
import { Dispatch } from "../redux";

export function LoginPage() {
  const [codeVerifi, setCodeVerifi] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch: Dispatch = useDispatch();
  const history = useHistory<typeof useHistory>();

  const Styles = {
    container: {
      backgroundImage:
        "URL(https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100vh",
    },
    capa: {
      backgroundColor: "rgba(230, 230, 230, 0.4)",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    login: {
      backgroundColor: "rgba(0,21,41,0.7)",
      color: "#fff",
      width: 500,
      height: "auto",
      padding: 20,
      borderRadius: 10,
    },
  };

  const verificar = (data: any) => {
    const { code } = data;
    setIsLoading(true);

    if (code === "0992239138") {
      setCodeVerifi(true);
    } else {
      message.error(`La clave de autorizacion: ${code} es incorrecta.`);
    }

    setIsLoading(false);
  };

  const iniciar_session = async () => {
    setIsLoading(true);

    try {
      const auth: any = dispatch(doGoogleLoginAction());
      console.log(auth);

      setIsLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <Head title="Iniciar Session" />
      <div style={Styles.container}>
        <div style={Styles.capa}>
          <div style={Styles.login}>
            <Row justify="center">
              <Col xs={22} md={10}>
                <img
                  src="img/logo.png"
                  alt="Logo centro de salud"
                  width={100}
                />
              </Col>
              <Col xs={22} md={14}>
                <h2 style={{ color: "#fff" }}>Acceder Centro de salud "5"</h2>
                {!codeVerifi ? (
                  <Form form={form} onFinish={verificar} name="dynamic_rule">
                    <Form.Item
                      name="code"
                      rules={[
                        {
                          required: true,
                          message: "Escribe el codigo de verificacion.",
                        },
                      ]}
                    >
                      <Input placeholder="Inserte el codigo de verificacion." />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType="submit"
                        block
                        type="primary"
                        loading={isLoading}
                      >
                        Verificar
                      </Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <>
                    <Button
                      block
                      type="dashed"
                      onClick={iniciar_session}
                      style={{ marginBottom: 10 }}
                    >
                      Entrar mediante GOOGLE
                    </Button>
                    <Alert
                      message="Codigo verificado"
                      type="success"
                      showIcon
                    />

                    {isLoading && <Spin size="large" />}
                  </>
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
