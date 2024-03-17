import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AudioDetailForm from "src/components/Form/AudioDetailForm";
import ComputersDetailForm from "src/components/Form/ComputersDetail";
import { useNavigate } from "react-router-dom";
import PhoneDetailForm from "src/components/Form/PhoneDetaiForm";
import * as productService from "src/services/Product/productService";
function CreateProductDetail() {
  const [errors, setErrors] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const typeId = parseInt(searchParams.get("type_id"));
  const productId = parseInt(searchParams.get("product_id"));
  useEffect(() => {
    const getNewProduct = async () => {
      const data = await productService.getDefinedProduct(productId);
      setNewProduct(data);
    };
    getNewProduct();
  }, [productId]);
  const handleSubmit = async (formData) => {
    try {
      const { data, success, error } = await productService.postProductDetail(
        typeId,
        formData
      );
      if (success) {
        console.log(data);
      } else {
        setErrors(error);
        const timeout = setTimeout(() => {
          setErrors([]);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let formDetail = null;
  switch (typeId) {
    case 1:
      formDetail = (
        <PhoneDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={newProduct}
        />
      );
      break;
    case 2:
      formDetail = (
        <ComputersDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={newProduct}
        />
      );
      break;
    case "3":
      formDetail = (
        <AudioDetailForm
          onSubmit={handleSubmit}
          errors={errors}
          data={newProduct}
        />
      );
      break;
    default:
  }
  return <>{formDetail}</>;
}

export default CreateProductDetail;
