import Form from "./Form";

function PhoneDetailForm({onSubmit, errors, data}) {
  const inputs = [
    {
      type: "text",
      name: 'product_id',
      label: "Product name",
      value: data.name,
      disabled: true
    },
    { type: "text", name: "color", label: "Color", placeholder: "Color" },
    { type: "text", name: "ram", label: "Ram", placeholder: "Ram" },
    { type: "text", name: "rom", label: "Rom", placeholder: "Rom" },
    { type: "text", name: "camera", label: "Camera", placeholder: "Camera" },
    {
      type: "text",
      name: "screen",
      label: "Screen",
      placeholder: "Screen",
    },
    {
      type: "select",
      name: "operating_system",
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
      <Form inputs={inputs} title={'Tạo chi tiết sản phẩm'} onSubmit={onSubmit} errors={errors}/>
    </>
  );
}

export default PhoneDetailForm;
