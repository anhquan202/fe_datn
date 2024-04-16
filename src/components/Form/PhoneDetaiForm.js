import Form from "./Form";

function PhoneDetailForm({ onSubmit, errors, data, title }) {
  const inputs = [
    {
      type: "text",
      name: "id",
      label: "Product ID",
      placeholder: "Product ID",
      disabled: true,
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
        { value: "iOS 10", label: "iOS 10" },
        { value: "iOS 11", label: "iOS 11" },
        { value: "iOS 12", label: "iOS 12" },
        { value: "iOS 13", label: "iOS 13" },
        { value: "iOS 14", label: "iOS 14" },
        { value: "iOS 15", label: "iOS 15" },
        { value: "iOS 16", label: "iOS 60" },
        { value: "Android", label: "Android" },
      ],
    },
  ];
  return (
    <>
      <Form
        inputs={inputs}
        title={title}
        data={data}
        onSubmit={onSubmit}
        errors={errors}
      />
    </>
  );
}

export default PhoneDetailForm;
