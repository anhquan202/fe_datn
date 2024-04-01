import Form from "src/components/Form/Form";

function CreateCustomer() {
  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Customer name",
      placeholder: "Customer name",
    },
    { type: "text", name: "phone", label: "Phone", placeholder: "Phone" },
    {
      type: "select",
      name: "gender",
      label: "Gender",
      options: [
        { value: "Nam", label: "Nam" },
        { value: "Nữ", label: "Nữ" },
        { value: "Khác", label: "Khác" },
      ],
    },
    { type: "text", name: "email", label: "Email", placeholder: "Email" },
  ];
  return (
    <>
      <Form
        inputs={inputs}
        title={"Tạo mới khách hàng"}
        data={{}}
        onSubmit={() => {}}
        errors={""}
      />
    </>
  );
}

export default CreateCustomer;
