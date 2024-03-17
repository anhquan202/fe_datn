
import MenuChildren from "./MenuChildren";
function ProductDetail() {
  const menuChildren = [
    {
      id: 1,
      name: "Điện thoại",
      path: "phoneDetails",
    },
    {
      id: 2,
      name: "PC và Laptop",
      path: "computersDetails",
    },
    {
      id: 3,
      name: "Loa và tai nghe",
      path: "audioDetails",
    },
  ];
  const tilte = 'Chi Tiết Sản Phẩm';
  return (
    <>
      <MenuChildren data={menuChildren} title={tilte}/>
    </>
  );
}
export default ProductDetail;
