import Form from "./Form";

function ComputersDetailForm({ onSubmit, errors, data, title }) {
  if (!data) {
    return;
  }
  const inputs = [
    {
      type: "text",
      name: "product_id",
      label: "Product ID",
      placeholder: "Product ID",
      disabled: true,
    },
    {
      type: "text",
      name: "CPU",
      label: "CPU",
      placeholder: "CPU",
    },
    {
      type: "text",
      name: "ram",
      label: "Ram",
      placeholder: "Ram",
    },
    {
      type: "text",
      name: "storage",
      label: "Storage",
      placeholder: "Storage",
    },
    { type: "text", name: "graphics", label: "Graphics", placeholder: "graphics" },
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
      <Form inputs={inputs} title={title} data={data} onSubmit={onSubmit} errors={errors} />
    </>
  );
}

export default ComputersDetailForm;
