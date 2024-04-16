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
  let typeId = searchParams.get("type_id");
  typeId = parseInt(typeId);
  const [product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    try {
      const getProductById = async () => {
        const data = await productService.getProductDetail(typeId, productId);
        if (data[0] && data[0].product) {
          // Thêm key mới productName vào product object
          data[0].product_id = data[0].product.id;
          // Xóa key name nếu không cần thiết
          delete data[0].product;
          setProduct(data[0]);
        }
      };
      getProductById();
    } catch (error) {
      console.log(error);
    }
  }, [productId, typeId]);
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
  const title = "Cập nhật thông tin chi tiết";
  let formUpdate = null;
  switch (typeId) {
    case 1:
      formUpdate = (
        <PhoneDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
          title={title}
        />
      );
      break;
    case 2:
      formUpdate = (
        <ComputersDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
          title={title}
        />
      );
      break;
    case 3:
      formUpdate = (
        <AudioDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={product}
          title={title}
        />
      );
      break;
    default:
  }
  return <>{formUpdate}</>;
}

export default UpdateProductDetail;
