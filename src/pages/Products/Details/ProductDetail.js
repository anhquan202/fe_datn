import AudioDetails from "./AudioDetail";
import ComputersDetail from "./ComputerDetail";
import PhoneDetail from "./PhoneDetail";
function ProductDetail({ typeId, data }) {
  const modifiedProducts = data.map((product) => {
    const { product_id, ...rest } = product;

    const modifiedProduct = Object.entries(rest).reduce((acc, [key, value]) => {
      acc[key] = value !== null ? value : "Trống";
      return acc;
    }, {});
    return {
      ...modifiedProduct,
      product: product.product.name,
    };
  });
  let page = null;
  const titleHeader = "Chi tiết sản phẩm";
  switch (typeId) {
    case 1:
      page = <PhoneDetail data={modifiedProducts} titleHeader={titleHeader} />;
      break;
    case 2:
      page = (
        <ComputersDetail data={modifiedProducts} titleHeader={titleHeader} />
      );
      break;
    case 3:
      page = <AudioDetails data={modifiedProducts} titleHeader={titleHeader} />;
      break;
    default:
  }
  return <>{page}</>;
}

export default ProductDetail;
