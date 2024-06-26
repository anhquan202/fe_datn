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
      label: "Tên sản phẩm",
      placeholder: "Samsung Galaxy...",
    },
    {
      type: "text",
      name: "cost_in",
      label: "Giá nhập",
      placeholder: "12,000,000đ",
    },
    {
      type: "text",
      name: "cost_out",
      label: "Giá bán",
      placeholder: "12,000,000đ",
    },
    {
      type: "number",
      name: "quantity",
      label: "Số lượng nhập",
      min: 1,
      value: 1,
    },
    { type: "file", name: "image", label: "Choose file:" },
    {
      type: "select",
      name: "type_id",
      label: "Loại sản phẩm",
      options: [
        { value: 1, label: "Điện thoại" },
        { value: 2, label: "PC và laptop" },
        { value: 3, label: "Loa, tai nghe" },
      ],
    },
    {
      type: "select",
      name: "manufacture",
      label: "Nhà sản xuất",
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
        alert("Đã tạo sản phẩm thành công, bây giờ thêm chi tiết nha!");
        navigate(
          `/product/createDetail?type_id=${data.type_id}&product_id=${data.id}`
        );
      } else {
        setErrors(error);
        const timeout = setTimeout(() => {
          setErrors([]);
        }, 2000);
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
        data={null}
        onSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
}

export default CreateProduct;
