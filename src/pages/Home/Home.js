import { useEffect, useState } from "react";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import * as productService from "src/services/Product/productService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Breadcrumb from "src/components/BreadCrumb";
import { Link } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const headerTitle = "Product List";
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
    const fetchApi = async () => {
      const { data, totalPage } = await productService.getProduct(currentPage);
      const modifiedProducts = data.map((product) => {
        const { type_id, ...rest } = product;
        return {
          ...rest,
          type: product.type.type,
        };
      });
      setProducts(modifiedProducts);
      setTotalPages(totalPage);
      setCurrentPage(currentPage);
    };
    fetchApi();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="d-flex py-3">
        <div className="container-fluid">
          {/* <Breadcrumb /> */}
          <div className="float-end">
            <Link to={"/product/create"} className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      </div>
      <Table title={headerTitle} headers={headers} data={products} />
      <Paginate
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Home;
