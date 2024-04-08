import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import * as productService from "src/services/Product/productService";
import * as searchServices from "src/services/searchService";
function ProductsType() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataFilter, setDataFilter] = useState({
    product_name: "",
    type_id: "",
    min_cost_out: 0,
    max_cost_out: 0,
  });
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
  const handleApiResponse = (data, totalPage) => {
    const modifiedProducts = data.map((product) => {
      const { ...rest } = product;
      return {
        ...rest,
        type: product.type.type,
      };
    });
    setProducts(modifiedProducts);
    setTotalPages(totalPage);
    setCurrentPage(currentPage);
  };

  const fetchProducts = async () => {
    try {
      const { data, totalPage } = await productService.getProduct(currentPage);
      handleApiResponse(data, totalPage);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataFilter]);
  const isFilterApplied = () => {
    // Kiểm tra xem bộ lọc có được áp dụng không
    console.log(
      Object.values(dataFilter).some((value) => value !== "" && value !== 0)
    );
    return Object.values(dataFilter).some((value) => value !== "");
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    const queryParams = new URLSearchParams();
    queryParams.append("current_page", pageNumber);
    if (isFilterApplied()) {
      // Nếu có dữ liệu filter, truyền dataFilter vào queryParams
      Object.entries(dataFilter).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      navigate(`/products?${queryParams.toString()}`);
    } else {
      // Nếu không có dữ liệu filter, chỉ truyền currentPage
      navigate(`/products?current_page=${pageNumber}`);
    }
  };
  const handleKeyChange = (newKey) => {
    // Thực hiện các thao tác bạn muốn với giá trị mới của key
    dataFilter.product_name = newKey;
  };
  console.log(dataFilter);
  const handleFilter = async () => {
    try {
      setProducts([]);
      const { data, totalPage, success } = await searchServices.searchData(
        dataFilter,
        1,
        "products/search"
      );
      if (success) {
        setProducts(data);
        handleApiResponse(data, totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle enter-press key and select an item
  const handleSelected = (item) => {
    setSelectedProduct(item);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
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
                <input
                  className="form-control"
                  type="text"
                  name="product_name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input-model" className="form-label">
                  Type
                </label>{" "}
                <select
                  name="type_id"
                  id="input-status"
                  className="form-select"
                  onChange={handleInputChange}
                >
                  <option value="1">Điện thoại</option>
                  <option value="2">PC và laptop</option>
                  <option value="3">Loa, tai nghe</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="input-price" className="form-label">
                  Price
                </label>{" "}
                <div className="d-flex">
                  <input
                    type="text"
                    name="min_cost_out"
                    placeholder="Price"
                    id="input-price"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="max_cost_out"
                    placeholder="Price"
                    id="input-price"
                    className="form-control"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-primary"
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
