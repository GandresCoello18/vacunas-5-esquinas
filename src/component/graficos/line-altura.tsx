import React from "react";
import { Line } from "react-chartjs-2";

export function LineGraficoAltura() {
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
              label: "Señal de peligro",
              data: [55, 62.2, 68, 75, 78, 83, 85, 87, 90],
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
              label: "Bueno",
              data: [50, 58, 65, 68, 71.6, 75, 78.2, 80, 83, 85],
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
            {
              label: "Peligro",
              data: [45, 55, 60, 63, 65, 69, 73.5, 75, 77],
              backgroundColor: [
                "rgba(203, 34, 73, 0.338)",
                "rgba(181, 76, 31, 0.653)",
                "rgba(234, 23, 69, 0.818)",
                "rgba(203, 16, 81, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "#e61dcf",
                "rgba(255, 99, 132, 1)",
                "#c41268",
                "#bb13c4",
                "#c2413f",
                "#f71b17",
              ],
              borderWidth: 2,
            },
          ],
        }}
      />
    </>
  );
}
