import Form from "./Form";

function AudioDetailForm({ onSubmit, errors, data, title }) {
  const inputs = [
    {
      type: "text",
      name: "id",
      label: "Product ID",
      placeholder: "Product ID",
      disabled: true,
    },
    {
      type: "select",
      name: "type",
      label: "Type",
      options: [
        { value: 1, label: "Tai nghe không dây" },
        { value: 2, label: "Tai nghe có dây" },
        { value: 3, label: "Loa" },
      ],
    },
    {
      type: "select",
      name: "connectivity",
      label: "Conectivity",
      options: [
        { value: 1, label: "Bluetooth" },
        { value: 2, label: "Jack 3.5mm" },
        { value: 3, label: "USB Type-C" },
      ],
    },
    { type: "text", name: "color", label: "Color", placeholder: "Color" },
    {
      type: "text",
      name: "driver_size",
      label: "Driver size",
      placeholder: "Driver size",
    },
    {
      type: "text",
      name: "cable_length",
      label: "Cable length",
      placeholder: "Cable length",
    },
    {
      type: "text",
      name: "charging_time",
      label: "Charging time",
      placeholder: "Charging time",
    },
    {
      type: "text",
      name: "usage_time",
      label: "Usage time",
      placeholder: "Usage time",
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

export default AudioDetailForm;
