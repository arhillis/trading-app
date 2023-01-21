import React from 'react';
import Chart from "react-apexcharts";

export default function DetailsChart({stockData, symbol}) {
    const color = stockData[0].y < stockData[stockData.length -1].y ? "#26C281" : "#ed3419";

    const options = {
        colors: [color],
        title: {
            text: symbol,
            align: "center",
            style: {
                color: 'blue',
                fontSize: '24px'
            }
        },
        chart: {
          id: "stock data",
          animations: {
            speed: 2500
          }
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
      };
    const series = [
        {
          name: symbol,
          data: stockData
        }
      ];
    return (
        <div>
            <Chart
              options={options}
              series={series}
              type="area"
              width="100%"
            />
        </div>
    )
}
