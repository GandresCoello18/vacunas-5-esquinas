import React from "react";
import { useParams } from "react-router-dom";
import { ReportesDiscuciones } from "../component/discuciones/reportes";
import { Layout } from "../component/layout";

interface Params {
  render: string;
}

export function DiscucionesPage() {
  const params: Params = useParams();

  return (
    <>
      <Layout head_title="Discuciones">
        {params.render === "reportes" && <ReportesDiscuciones />}
      </Layout>
    </>
  );
}
