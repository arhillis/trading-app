import React from 'react';
import Chart from "react-apexcharts";

export default function DetailsChart({stockData, symbol}) {
    const {oneDay, oneWeek, oneYear} = stockData;

    console.log(symbol);
    console.log(stockData);

    const options = {
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
        xaxis: {
            type: "datetime",
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      };
    const series = [
        {
          name: symbol,
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ];
    return (
        <div>
            <Chart
              options={options}
              series={series}
              type="line"
              width="500"
            />
        </div>
    )
}
