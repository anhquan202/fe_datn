import Search from "src/components/Search";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import * as productService from "src/services/Product/productService";
import { useEffect, useState } from "react";
function ComputersDetail() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const headers = [
    "STT",
    "Loại",
    "CPU",
    "RAM",
    "Ổ nhớ",
    "Card đồ họa",
    "HĐH",
    "Mô tả chi tiết",
    "Tên sản phẩm",
    "Thao tác",
  ];
  useEffect(() => {
    const fetchApi = async () => {
      const { data, totalPage } = await productService.getComputersDetail(currentPage);
      const modifiedProducts = data.map((product) => {
        const { product_id, ...rest } = product;

        const modifiedProduct = Object.entries(rest).reduce(
          (acc, [key, value]) => {
            acc[key] = value !== null ? value : "Trống";
            return acc;
          },
          {}
        );
        return {
          ...modifiedProduct,
            product: product.product.name,
        };
      });
      setProducts(modifiedProducts);
      setCurrentPage(currentPage);
      setTotalPages(totalPage);
    };
    fetchApi();
  }, [currentPage]);
  console.log(currentPage);
  console.log(totalPages);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <h4 className="">Danh sách sản phẩm</h4>

      <div className="d-flex flex-column">
        <Search />
        <Table headers={headers} data={products} />
        <Paginate
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ComputersDetail;
