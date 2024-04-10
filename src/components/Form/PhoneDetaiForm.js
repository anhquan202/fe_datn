import Form from "./Form";

function PhoneDetailForm({ onSubmit, errors, data, title }) {
  if (!data) {
    return;
  }
  const inputs = [
    {
      type: "text",
      name: "id",
      label: "Product ID",
      placeholder: "Product ID",
      disabled:true
    },
    {
      type: "text",
      name: "color",
      label: "Color",
      placeholder: "Color",
    },
    {
      type: "text",
      name: "ram",
      label: "Ram",
      placeholder: "Ram",
    },
    {
      type: "text",
      name: "rom",
      label: "Rom",
      placeholder: "Rom",
    },
    {
      type: "text",
      name: "camera",
      label: "Camera",
      placeholder: "Camera",
    },
    {
      type: "text",
      name: "Screen",
      label: "Screen",
      placeholder: "Screen",
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

export default PhoneDetailForm;
