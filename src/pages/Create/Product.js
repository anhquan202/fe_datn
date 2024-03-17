import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "src/components/Form/Form";
import * as productService from "src/services/Product/productService";
function CreateProduct() {
  const title = "Tạo mới sản phẩm";
  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Product name",
      placeholder: "Product name",
    },
    { type: "text", name: "cost_in", label: "Cost in", placeholder: "Cost in" },
    {
      type: "text",
      name: "cost_out",
      label: "Cost out",
      placeholder: "Cost out",
    },
    {
      type: "number",
      name: "quantity",
      label: "Quantity",
      placeholder: "Quantity",
      min: 1,
      value: 1
    },
    { type: "file", name: "image", label: "Choose file:" },
    {
      type: "select",
      name: "type_id",
      label: "Type",
      options: [
        { value: 1, label: "Điện thoại" },
        { value: 2, label: "PC và laptop" },
        { value: 3, label: "Loa, tai nghe" },
      ],
    },
    {
      type: "select",
      name: "manufacture",
      label: "Manufacture",
      options: [
        { value: 1, label: "Apple" },
        { value: 2, label: "Samsung" },
        { value: 3, label: "Xiaomi" },
      ],
    },
  ];
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    try {
      const { data, success, error } = await productService.postProduct(
        formData
      );
      if (success) {
        console.log(data)
        alert('Đã tạo sản phẩm thành công, bây giờ thêm chi tiết nha!');
        navigate(`/product/createDetail?type_id=${formData.type_id}&product_id=${data.id}`);
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
  return (
    <>
      <Form
        inputs={inputs}
        title={title}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
}

export default CreateProduct;
