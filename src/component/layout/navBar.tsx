import React, { useState } from "react";
import { Menu } from "antd";
import { MailOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Dispatch } from "../../redux";
import { loGOutSession } from "../../redux/modulos/session";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export function NavBar() {
  const [current, setCurrent] = useState<string>("mail");
  const dispatch: Dispatch = useDispatch();

  const handleClick = (e: any) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <Menu
        onClick={handleClick}
        theme="dark"
        selectedKeys={[current]}
        mode="horizontal"
        style={{ width: "100%" }}
      >
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch(loGOutSession());
            Cookies.remove("id-user");
          }}
          key="app"
          icon={<AppstoreOutlined />}
        >
          Cerrar Seesion
        </Menu.Item>
      </Menu>
    </>
  );
}
