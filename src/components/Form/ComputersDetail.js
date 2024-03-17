import Form from "./Form";

function ComputersDetailForm({onSubmit, errors, data}) {
  const inputs = [
    {
      type: "text",
      name: "product_id",
      label: "Product name",
      placeholder: "Product name",
    },
    { type: "text", name: "color", label: "Color", placeholder: "Color" },
    { type: "text", name: "ram", label: "Ram", placeholder: "Ram" },
    { type: "text", name: "rom", label: "Rom", placeholder: "Rom" },
    { type: "text", name: "camera", label: "Camera", placeholder: "Camera" },
    {
      type: "text",
      name: "Screen",
      label: "Screen",
      placeholder: "Screen",
    },
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
      name: "operating_ystem",
      label: "Operating System",
      options: [
        { value: 1, label: "Apple" },
        { value: 2, label: "Samsung" },
        { value: 3, label: "Xiaomi" },
      ],
    },
  ];
  return (
    <>
      <Form inputs={inputs} title={"Tạo chi tiết sản phẩm"} onSubmit={onSubmit} errors={errors} />
    </>
  );
}

export default ComputersDetailForm;
