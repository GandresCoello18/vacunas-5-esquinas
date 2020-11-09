import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../component/layout";
import { CalendarioVacuna } from "../component/vacunas/calendario";
import { ReporteVacuna } from "../component/vacunas/reportes";

interface Params {
  render: string;
}

export function VacunasPage() {
  const params: Params = useParams();

  return (
    <>
      <Layout head_title="Vacunas">
        {params.render === "calendario" && <CalendarioVacuna />}
        {params.render === "reportes" && <ReporteVacuna />}
      </Layout>
    </>
  );
}
