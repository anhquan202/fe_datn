import { useEffect, useState } from "react";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import * as invoiceServices from "src/services/Invoice/invoiceService";
function BarChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const getTotalAmountByDay = async () => {
        const { data } = await invoiceServices.getTotalAmountByDay();
        setData(data);
      };
      getTotalAmountByDay();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="bg-primay">
        <h4 className="ms-3">Statistics Sales</h4>
        <Bar
          data={{
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], // Sử dụng ngày bán hàng làm nhãn
            datasets: [
              {
                label: 'Last week',
                data: data.length > 0 && data.map((item) => item.total_amount_sum_lastweek),
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "This Week",
                data: data.length > 0 && data.map((item) => item.total_amount_sum_thisweek),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          }}
        />
      </div>
    </>
  );
}

export default BarChart;
