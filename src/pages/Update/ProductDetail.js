import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import * as productService from "src/services/Product/productService";
import AudioDetailForm from "src/components/Form/AudioDetailForm";
import ComputersDetailForm from "src/components/Form/ComputersDetail";
import PhoneDetailForm from "src/components/Form/PhoneDetaiForm";
function UpdateProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeId = parseInt(searchParams.get("type_id"));
  const [product, setProduct] = useState();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    try {
      const getProductById = async () => {
        const data = await productService.getProductDetail(typeId, productId);
        if (data && data.product) {
          // Thêm key mới productName vào product object
          data.product_id = data.product.id;
          // Xóa key name nếu không cần thiết
          delete data.product;
          setProduct(data);
        }
      };
      getProductById();
    } catch (error) {
      console.log(error);
    }
  }, [productId, typeId]);
  if (!product) {
    return null;
  }
  const handleSubmit = async (formData) => {
    try {
      const { data, sucees, error } = await productService.postProductDetail(
        typeId,
        formData
      );
      if (sucees) {
        console.log(data);
      } else {
        setErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let formUpdate = null;
  switch (typeId) {
    case 1:
      formUpdate = (
        <PhoneDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
        />
      );
      break;
    case 2:
      formUpdate = (
        <ComputersDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
        />
      );
      break;
    case 3:
      formUpdate = (
        <AudioDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
        />
      );
      break;
    default:
  }
  return <>{formUpdate}</>;
}

export default UpdateProductDetail;
