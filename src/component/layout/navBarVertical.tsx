import React, { useState } from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  MedicineBoxOutlined,
  LayoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export function NavBarVertical() {
  const [theme] = useState<string | any>("dark");
  const [current, setCurrent] = useState<string>("darshboard");

  const handleClick = (e: any) => setCurrent(e.key);

  return (
    <>
      <Menu
        theme={theme}
        onClick={handleClick}
        style={{ width: 206, height: "100vh" }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
      >
        <Menu.Item icon={<LayoutOutlined />} key="darshboard">
          <Link to="/">Inicio</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserAddOutlined />} title="Pacientes">
          <Menu.Item key="1">Reportes</Menu.Item>
          <Menu.Item key="2">
            <Link to="/pacientes/ingreso">Ingresar nuevo</Link>
          </Menu.Item>
          <Menu.Item key="3">Representante</Menu.Item>
          <Menu.Item key="4">Estadisticas</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<MedicineBoxOutlined />} title="Vacunas">
          <Menu.Item key="5">
            <Link to="/vacunas/reporte">Reportes</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/vacunas/calendario">Calendario</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}
