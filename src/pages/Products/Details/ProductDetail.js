import { useEffect, useState } from "react";
import AudioDetails from "./AudioDetail";
import ComputersDetail from "./ComputerDetail";
import PhoneDetail from "./PhoneDetail";
import * as productServices from "src/services/Product/productService";
function ProductDetail({ typeId, id }) {
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    try {
      const getProductDetail = async () => {
        const res = await productServices.getProductDetail(typeId, id);
        setProductDetail(res);
      };
      getProductDetail();
    } catch (error) {
      console.log(error);
    }
  }, [typeId, id]);
  const modifiedProducts = productDetail.map((product) => {
    const { product_id, ...rest } = product;

    const modifiedProduct = Object.entries(rest).reduce((acc, [key, value]) => {
      acc[key] = value !== null ? value : "Trống";
      return acc;
    }, {});
    return {
      ...modifiedProduct,
      product: product.product.name,
    };
  });
  let page = null;
  const titleHeader = "Chi tiết sản phẩm";
  switch (typeId) {
    case 1:
      page = <PhoneDetail data={modifiedProducts} titleHeader={titleHeader} />;
      break;
    case 2:
      page = (
        <ComputersDetail data={modifiedProducts} titleHeader={titleHeader} />
      );
      break;
    case 3:
      page = <AudioDetails data={modifiedProducts} titleHeader={titleHeader} />;
      break;
    default:
  }
  return <>{page}</>;
}

export default ProductDetail;
