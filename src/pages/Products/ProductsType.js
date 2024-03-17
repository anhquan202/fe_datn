import { useEffect, useState } from "react";
import { useNavigate , useLocation } from "react-router-dom";
import Search from "src/components/Search";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import * as productService from "src/services/Product/productService";
import Button from "src/components/Button";
function ProductsType() {
  const [productsByType, setProductsByType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const headerTitle = 'Product List';
  const headers = [
    "Product name",
    "Cost in",
    "Cost out",
    "Image",
    "Quantity",
    "Manufacture",
    "Type",
    "Action",
  ];
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeID = params.get("typeID");
    const fetchApi = async () => {
      const { data, totalPage } = await productService.GetProductByType(
        typeID,
        currentPage
      );
      const modifiedProducts = data.map((product) => {
        const { type_id, ...rest } = product;
        return {
          ...rest,
          type: product.type.type,
        };
      });

      setProductsByType(modifiedProducts);
      setTotalPages(totalPage);
      setCurrentPage(currentPage);
    };
    fetchApi();
  }, [location.search, currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="container">
      <h4 className="">Danh sách sản phẩm</h4>

      <div className="d-flex flex-column">
        <Search />
        <Button className={'bg-info w-25'} onClick={() => navigate("/product/create")}>Thêm mới sản phẩm</Button>
        <Table title={headerTitle} headers={headers} data={productsByType} />
        <Paginate
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProductsType;
