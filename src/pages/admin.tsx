import { Layout } from "../component/layout";
import React from "react";
import { UsuariosAdmin } from "../component/admin/usuarios";
import { useParams } from "react-router-dom";

interface Params {
  render: string;
}

export function AdminPage() {
  const params: Params = useParams();

  return (
    <>
      <Layout head_title="Administracion">
        {params.render === "usuario" && <UsuariosAdmin />}
      </Layout>
    </>
  );
}
