import React, { useState } from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  MedicineBoxOutlined,
  LayoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Usuario_INT } from "../../interface";

const { SubMenu } = Menu;

export function NavBarVertical() {
  const [theme] = useState<string | any>("dark");
  const [current, setCurrent] = useState<string>("darshboard");

  const MyUser: Usuario_INT = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );
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
        <SubMenu key="sub1" icon={<UsergroupAddOutlined />} title="Pacientes">
          <Menu.Item key="1">
            <Link to="/pacientes/reportes">Reportes</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/pacientes/ingreso">Ingresar nuevo</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UserAddOutlined />} title="Representantes">
          <Menu.Item key="1">
            <Link to="/representantes/reportes">Reportes</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" icon={<MedicineBoxOutlined />} title="Vacunas">
          <Menu.Item key="1">
            <Link to="/vacunas/reportes">Reportes</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/vacunas/calendario">Calendario</Link>
          </Menu.Item>
        </SubMenu>
        {MyUser.isAdmin && (
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Administracion">
            <Menu.Item key="1">
              <Link to="/admin/usuario">Usuarios</Link>
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </>
  );
}
