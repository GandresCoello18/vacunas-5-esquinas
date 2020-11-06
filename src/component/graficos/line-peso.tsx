import React from "react";
import { Line } from "react-chartjs-2";

export function LineGraficoPeso() {
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
              data: [4, 7, 10, 11, 11.5, 12.5, 13.2, 14, 15],
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
              data: [3, 5.2, 7, 8, 8.4, 9.1, 10, 10.4, 11.5],
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
              data: [2, 4, 5.2, 6.5, 7.2, 8, 8.3, 9, 9.7],
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
