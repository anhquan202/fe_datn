import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import Search from "src/components/Search";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import * as productService from "src/services/Product/productService";
import * as searchServices from "src/services/searchService";
function ProductsType() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromCost, setFromCost] = useState(0);
  const [toCost, setToCost] = useState(0);
  const [type, setType] = useState("");
  const navigate = useNavigate();

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
  const handleSearchKeyChange = (newKey) => {
    setSearchValue(newKey);
  };

  const handleEdit = (productId) => {
    navigate(`/product/update/${productId}`);
  };
  const handleDelete = async (id) => {
    try {
      const { success } = await productService.deleteProduct(id);
      if (success) {
        alert("Đã xóa sản phẩm thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApiResponse = (data) => {
    const modifiedProducts = data.data.map((product) => {
      const { ...rest } = product;
      return {
        ...rest,
        type: product.type.type,
      };
    });
    setTotalPages(data.totalPage);
    setProducts(modifiedProducts);
    setCurrentPage(data.current_page);
  };
  useEffect(() => {
    try {
      const fetchApi = async () => {
        const data = await productService.getProduct(currentPage);
        handleApiResponse(data);
      };
      fetchApi();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/products?current_page=${pageNumber}`);
  };
  const handleFilter = async () => {
    try {
      setProducts([]);
      const filters = {
        product_name: searchValue,
        type_id: type,
        min_cost_out: fromCost,
        max_cost_out: toCost,
      };
      const { data, success } = await searchServices.searchData(
        currentPage,
        filters,
        "products/search"
      );
      if (success) {
        setProducts(data);
        handleApiResponse(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle enter-press key and select an item
  const handleSelected = (item) => {
    setSelectedProduct(item);
  };
  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-end">
          <div className="mb-3">
            <Link to={"/product/create"} className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <Table
            title={headerTitle}
            headers={headers}
            data={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            classNames={"col-9"}
            dataType="product"
          />
          <div className="card " style={{ width: "23%" }}>
            <div className="card-header">
              <FontAwesomeIcon icon={faFilter} />
              Filter
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label> Name</label>
                <Search
                  placeholder={"Search products..."}
                  name={"product_name"}
                  api={"products/search"}
                  onSelected={handleSelected}
                  onKeyChange={handleSearchKeyChange}
                />
              </div>
              <div className="mb-3">
                <label for="input-model" className="form-label">
                  Type
                </label>{" "}
                <select
                  name="filter_type"
                  id="input-status"
                  className="form-select"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="1">Điện thoại</option>
                  <option value="2">PC và laptop</option>
                  <option value="3">Loa, tai nghe</option>
                </select>
              </div>

              <div className="mb-3">
                <label for="input-price" className="form-label">
                  Price
                </label>{" "}
                <div className="d-flex">
                  <input
                    type="text"
                    name="from_price"
                    placeholder="Price"
                    id="input-price"
                    className="form-control"
                    onChange={(e) => setFromCost(e.target.value)}
                  />
                  <input
                    type="text"
                    name="to_price"
                    placeholder="Price"
                    id="input-price"
                    className="form-control"
                    onChange={(e) => setToCost(e.target.value)}
                  />
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  id="button-filter"
                  className="btn btn-light"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
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
