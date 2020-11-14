import React from "react";
import { Line } from "react-chartjs-2";

interface Props {
  MisDatos: Array<number>;
}

export function LineGraficoMiEstadisctica({ MisDatos }: Props) {
  return (
    <>
      <Line
        data={{
          labels: [
            "Naci",
            "Mes 2",
            "Mes 4",
            "Mes 6",
            "Mes 8",
            "Mes 10",
            "Mes 12",
            "Mes 14",
            "Mes 16",
          ],
          datasets: [
            {
              label: "Mi Progreso",
              data: MisDatos,
              backgroundColor: [
                `rgba(45, 227, 24, 0.2)`,
                `rgba(190, 42, 74, 0.742)`,
                `rgba(63, 173, 70, 0.2)`,
                `rgba(75, 192, 192, 0.2)`,
                `rgba(153, 102, 255, 0.2)`,
                `rgba(255, 159, 64, 0.2)`,
              ],
              borderColor: [
                `#0fea80`,
                `#11803f`,
                `rgba(255, 206, 86, 1)`,
                `rgba(75, 192, 192, 1)`,
                `rgba(153, 102, 255, 1)`,
                `rgba(255, 159, 64, 1)`,
              ],
              borderWidth: 2,
            },
          ],
        }}
      />
    </>
  );
}
