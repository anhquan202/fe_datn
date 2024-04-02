import MenuChildren from "./MenuChildren";
function Invoice() {
  const menuChildren = [
    {
      id: 1,
      name: "Hóa đơn",
      path: 'invoices'
    },
    {
      id: 2,
      name: "Chi tiết",
    },
  ];
  const tilte = "Hóa đơn";
  return (
    <>
      <MenuChildren data={menuChildren} title={tilte} />
    </>
  );
}
export default Invoice;
