import { useEffect, useState } from "react";
import axios from "axios";
import MenuChildren from "./MenuChildren";
function Product() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/be_datn/datn/public/api/types`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const tilte = 'Sản Phẩm';
  return (
    <>
      <MenuChildren data={categories} title={tilte}/>
    </>
  );
}

export default Product;
