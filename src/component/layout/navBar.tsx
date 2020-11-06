import React, { useState } from "react";
import { Avatar, Menu } from "antd";
import { CloseSquareOutlined } from "@ant-design/icons";
import { Dispatch } from "../../redux";
import { loGOutSession } from "../../redux/modulos/session";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import { MyUser } from "../../interface";

export function NavBar() {
  const [current, setCurrent] = useState<string>("");
  const dispatch: Dispatch = useDispatch();
  const history = useHistory<typeof useHistory>();

  const MiUser: MyUser = useSelector(
    (state: RootState) => state.SessionReducer.MyUser
  );

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
        <Menu.Item key="mail">
          <Avatar
            src={
              MiUser.photoURL
                ? MiUser.photoURL
                : "https://www.flaticon.es/svg/static/icons/svg/848/848006.svg"
            }
          />
          &nbsp; &nbsp;
          {MiUser.displayName ? MiUser.displayName : "No identificado"}
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch(loGOutSession());
            Cookies.remove("id-user");
            history.push("/login");
          }}
          key="app"
          icon={<CloseSquareOutlined />}
        >
          Cerrar Seesion
        </Menu.Item>
      </Menu>
    </>
  );
}
