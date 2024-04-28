import { useCallback, useEffect, useState } from "react";
import * as invoiceService from "src/services/Invoice/invoiceService";

import Table from "src/components/Table";
import TotalInvoices from "src/components/Report/TotalInvoices";
import TotalProducts from "src/components/Report/TotalProducts";
import TotalSales from "src/components/Report/TotalSales";
import TotalCustomer from "src/components/Report/TotalCustomer";
import BarChart from "src/components/BarChart";
function Home() {
  const [topProducts, setTopProducts] = useState([]);

  const headerTitle = "Sản phẩm bán chạy";
  const headers = [
    "Tên sản phẩm",
    "Giá nhập",
    "Giá bán",
    "Ảnh",
    "Nhà sản xuất",
    "Lần mua",
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
      <div className="d-flex">
        <Table
          title={headerTitle}
          headers={headers}
          data={topProducts}
          disabled={true}
          styleCss={'w-50 pe-3 border-0'}
        />

        <BarChart />
      </div>
    </>
  );
}

export default Home;
