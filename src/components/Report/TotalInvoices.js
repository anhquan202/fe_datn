import { useEffect, useState } from "react";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Statistics from "./Count";
function InvoiceCount() {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const title = "Total invoices";
  useEffect(() => {
    const getTotalInvoices = async () => {
      try {
        const res = await invoiceServices.getTotalInvoices();
        setTotalInvoices(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalInvoices();
  }, [totalInvoices]);
  return (
    <>
      <Statistics
        data={totalInvoices.toLocaleString()}
        title={title}
        icon={faShoppingCart}
      />
    </>
  );
}

export default InvoiceCount;
