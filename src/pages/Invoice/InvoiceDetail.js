import Table from "src/components/Table";

function InvoiceDetail({ data }) {
  const headers = [
    "Quantity purchased",
    "Unit price",
    "Total price",
    "Invoice ID",
    "Product Name",
  ];
  const modifiedProducts = data.map((product) => {
    const { product_id, ...rest } = product;
    return {
      ...rest,
      product: product.product.name,
    };
  });
  return (
    <>
      <Table
        title={"Chi tiết hóa đơn"}
        data={modifiedProducts}
        headers={headers}
        disabled={true}
      />
    </>
  );
}

export default InvoiceDetail;
