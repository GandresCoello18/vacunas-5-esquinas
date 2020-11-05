import React from "react";
import { Line } from "react-chartjs-2";

export function LineGrafico() {
  return (
    <>
      <Line
        data={{
          labels: [],
          datasets: [
            {
              label: "Productos vendidos",
              data: [54, 63, 2, 5, 12, 22, 45],
              backgroundColor: [
                `rgba(255, 206, 86, 0.2)`,
                `rgba(255, 99, 132, 0.2)`,
                `rgba(54, 162, 235, 0.2)`,
                `rgba(75, 192, 192, 0.2)`,
                `rgba(153, 102, 255, 0.2)`,
                `rgba(255, 159, 64, 0.2)`,
              ],
              borderColor: [
                `rgba(255, 99, 132, 1)`,
                `rgba(54, 162, 235, 1)`,
                `rgba(255, 206, 86, 1)`,
                `rgba(75, 192, 192, 1)`,
                `rgba(153, 102, 255, 1)`,
                `rgba(255, 159, 64, 1)`,
              ],
              borderWidth: 2,
            },
            {
              label: "Monto obtenido",
              data: [5, 45, 2, 6, 8, 50, 5],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 2,
            },
          ],
        }}
      />
    </>
  );
}
