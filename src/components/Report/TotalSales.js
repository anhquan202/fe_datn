import { useEffect, useState } from "react";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import Statistics from "./Count";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
function TotalSales() {
  const [totalSales, setTotalSales] = useState(0);
  const title = "Total Sales";
  useEffect(() => {
    const getTotalSales = async () => {
      try {
        const res = await invoiceServices.getTotalSales();
        setTotalSales(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalSales();
  }, [totalSales]);
  return (
    <>
      <Statistics
        data={totalSales.toLocaleString()}
        title={title}
        icon={faProductHunt}
      />
    </>
  );
}

export default TotalSales;
