import { useEffect, useState } from "react";
import * as productServices from "src/services/Product/productService";
import Statistics from "./Count";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
function TotalProducts() {
  const [totalProducts, setTotalProducts] = useState(0);
  const title = "Total Products";
  useEffect(() => {
    const getTotalProducts = async () => {
      try {
        const res = await productServices.getTotalProducts();
        setTotalProducts(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalProducts();
  }, [totalProducts]);
  return (
    <>
      <Statistics
        data={totalProducts}
        title={title}
        icon={faProductHunt}
      />
    </>
  );
}

export default TotalProducts;
