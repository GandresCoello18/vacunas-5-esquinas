import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../component/layout";
import { IngresoPaciente } from "../component/pacientes/ingreso";
import { ReportePaciente } from "../component/pacientes/reportes";

interface Params {
  render: string;
}

export function PacientesPage() {
  const params: Params = useParams();

  return (
    <>
      <Layout head_title="Pacientes">
        {params.render === "reportes" && <ReportePaciente />}
        {params.render === "ingreso" && <IngresoPaciente />}
        {params.render === "representate" && "representate"}
        {params.render === "estadisticas" && "estadisticas"}
      </Layout>
    </>
  );
}
