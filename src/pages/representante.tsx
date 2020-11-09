import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../component/layout";
import { ReporteRepresentante } from "../component/representante/reporteRepresentante";

interface Params {
  render: string;
}

export function RepresentantePage() {
  const params: Params = useParams();

  return (
    <>
      <Layout head_title="Representantes">
        {params.render === "reportes" && <ReporteRepresentante />}
      </Layout>
    </>
  );
}
