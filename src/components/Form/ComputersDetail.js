import Form from "./Form";

function ComputersDetailForm({ onSubmit, errors, data, title }) {
  if (!data) {
    return;
  }
  const inputs = [
    {
      type: "text",
      name: data.name,
      label: "Product name",
      placeholder: "Product name",
      value: data.name,
      disabled: true,
    },
    {
      type: "text",
      name: "color",
      label: "Color",
      placeholder: "Color",
      value: data.color,
    },
    {
      type: "text",
      name: "ram",
      label: "Ram",
      placeholder: "Ram",
      value: data.ram,
    },
    {
      type: "text",
      name: "rom",
      label: "Rom",
      placeholder: "Rom",
      value: data.rom,
    },
    { type: "text", name: "camera", label: "Camera", placeholder: "Camera" , value: data.camera,},
    {
      type: "text",
      name: "Screen",
      label: "Screen",
      placeholder: "Screen",
      value: data.screen,
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
      value: data.type_id,
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
      <Form inputs={inputs} title={title} onSubmit={onSubmit} errors={errors} />
    </>
  );
}

export default ComputersDetailForm;
