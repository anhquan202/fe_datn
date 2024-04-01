import { useCallback, useEffect, useState } from "react";
import * as productService from "src/services/Product/productService";
import Table from "src/components/Table";
import TotalInvoices from "src/components/Report/TotalInvoices";
import TotalProducts from "src/components/Report/TotalProducts";
import TotalSales from "src/components/Report/TotalSales";
import TotalCustomer from "src/components/Report/TotalCustomer";
import SelectOption from "src/components/SelectOption";
function Home() {
  const [topProducts, setTopProducts] = useState([]);
 
  const headerTitle = "Top Products";
  const headers = [
    "Product name",
    "Cost in",
    "Cost out",
    "Image",
    "Quantity",
    "Manufacture",
    "Type",
  ];
  const [sortOrder, setSortOrder] = useState("desc");
  const select = [
    {
      type: "select",
      name: "sort_order",
      label: "Lọc",
      options: [
        { value: "desc", label: "Bán chạy" },
        { value: "asc", label: "Khó bán" },
      ],
    },
  ];
  const handleSelectChange = (name, value) => {
    setSortOrder(value);
  };
  useEffect(() => {
    try {
      const fetchApi = async () => {
        const data = await productService.getTopProduct(sortOrder);
        const modifiedProducts = data.map((product) => {
          const { id, ...rest } = product;
          return {
            ...rest,
            type: product.type.type,
          };
        });
        setTopProducts(modifiedProducts);
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
  }, [sortOrder]);
  const fetchTopProducts = useCallback(async () => {
    try {
      const data = await productService.getTopProduct(sortOrder);
      const modifiedProducts = data.map((product) => {
        const { id, ...rest } = product;
        return {
          ...rest,
          type: product.type.type,
        };
      });
      setTopProducts(modifiedProducts);
    } catch (error) {
      console.log(error);
    }
  }, [sortOrder]);
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
        select={<SelectOption data={select} onChange={handleSelectChange} />}
        classNames={"justify-content-between align-items-center"}
      />
    </>
  );
}

export default Home;
