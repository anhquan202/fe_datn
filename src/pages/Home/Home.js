import { useCallback, useEffect, useState } from "react";
import * as invoiceService from "src/services/Invoice/invoiceService";

import Table from "src/components/Table";
import TotalInvoices from "src/components/Report/TotalInvoices";
import TotalProducts from "src/components/Report/TotalProducts";
import TotalSales from "src/components/Report/TotalSales";
import TotalCustomer from "src/components/Report/TotalCustomer";
function Home() {
  const [topProducts, setTopProducts] = useState([]);
 
  const headerTitle = "Top Products";
  const headers = [
    "Product name",
    "Cost in",
    "Cost out",
    "Image",
    "Manufacture",
    "Total",
  ];
  const fetchTopProducts = useCallback(async () => {
    try {
      const data = await invoiceService.getHotProduct();
     const modifiedProducts = data.map((product) => {
        const { quantity, ...rest } = product;
        return {
          ...rest,
        }; 
      });
      setTopProducts(modifiedProducts);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchTopProducts();
  }, [fetchTopProducts]);
  return (
    <>
      <div className="row">
        <TotalInvoices />
        <TotalProducts />
        <TotalSales />
        <TotalCustomer />
      </div>
      <Table
        title={headerTitle}
        headers={headers}
        data={topProducts}
        disabled={true}
        classNames={"justify-content-between align-items-center"}
      />
    </>
  );
}

export default Home;
