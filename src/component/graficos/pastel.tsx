import React from "react";
import { Doughnut } from "react-chartjs-2";

export function PastelGrafico() {
  return (
    <>
      <Doughnut
        data={{
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
          ],
          datasets: [
            {
              label: "Productos vendidos",
              data: [5, 18, 4, 2, 4, 8, 6],
              backgroundColor: [
                `rgba(255, 99, 132, 0.2)`,
                `rgba(75, 192, 192, 0.2)`,
                `rgba(153, 102, 255, 0.2)`,
                `rgba(54, 162, 235, 0.2)`,
                `rgba(255, 206, 86, 0.2)`,
                `rgba(255, 159, 64, 0.2)`,
                `rgba(25, 199, 132, 0.2)`,
                `rgba(175, 142, 192, 0.2)`,
                `rgba(113, 152, 255, 0.2)`,
                `rgba(90, 162, 235, 0.2)`,
                `rgba(55, 236, 86, 0.2)`,
                `rgba(215, 59, 64, 0.2)`,
              ],
              borderColor: [
                `rgba(255, 99, 132, 1)`,
                `rgba(75, 192, 192, 1)`,
                `rgba(153, 102, 255, 1)`,
                `rgba(54, 162, 235, 1)`,
                `rgba(255, 206, 86, 1)`,
                `rgba(255, 159, 64, 1)`,
                `rgba(25, 199, 132, 1)`,
                `rgba(175, 142, 192, 1)`,
                `rgba(113, 152, 255, 1)`,
                `rgba(90, 162, 235, 1)`,
                `rgba(55, 236, 86, 1)`,
                `rgba(215, 59, 64, 1)`,
              ],
              borderWidth: 2,
            },
          ],
        }}
      />
    </>
  );
}
