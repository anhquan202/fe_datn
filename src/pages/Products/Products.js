import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Table from "src/components/Table";
import Paginate from "src/components/Paginate";
import Button from "src/components/Button";
import * as productService from "src/services/Product/productService";
import * as searchServices from "src/services/searchService";
function ProductsType() {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [productIdToDelete,setProductIdToDelete] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataFilter, setDataFilter] = useState({
    product_name: "",
    type_id: "",
    min_cost_out: "",
    max_cost_out: "",
  });
  const navigate = useNavigate();

  const headerTitle = "Danh sách sản phẩm";
  const headers = [
    "Tên sản phẩm",
    "Giá nhập",
    "Giá bán",
    "Ảnh",
    "Số lượng",
    "Nhà sản xuất",
    "Loại sản phẩm",
  ];
  const handleShowDeleteModal = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleEdit = (event, productId) => {
    event.stopPropagation();
    navigate(`/product/update/${productId}`);
  };
  const handleDelete = async () => {
    try {
      setShowModal(false);
      const { success } = await productService.deleteProduct(productIdToDelete);
      if (success) {
        alert("Đã xóa sản phẩm thành công");
        setProducts(products.filter(product => product.id !== productIdToDelete)); 
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
      if (
        dataFilter.product_name ||
        dataFilter.type_id ||
        dataFilter.min_cost_out ||
        dataFilter.max_cost_out
      ) {
        await handleFilter();
      } else {
        const { data, totalPage } = await productService.getProduct(
          currentPage
        );
        handleApiResponse(data, totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, dataFilter]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/products?current_page=${pageNumber}`);
  };
  const handleFilter = async () => {
    try {
      const { data, totalPage, success } = await searchServices.searchData(
        dataFilter,
        currentPage,
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevDataFilter) => ({
      ...prevDataFilter,
      [name]: value,
    }));
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className={"btn-danger"}
            onClick={handleCloseModal}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            className={"btn-primary"}
            onClick={handleDelete}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
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
              showModalDelete={handleShowDeleteModal}
            />
            <div className="card " style={{ width: "23%" }}>
              <div className="card-header">
                <FontAwesomeIcon icon={faFilter} />
                Lọc kết quả
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label> Tên sản phẩm </label>
                  <input
                    className="form-control"
                    type="text"
                    name="product_name"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="input-model" className="form-label">
                    Loại sản phẩm
                  </label>
                  <select
                    name="type_id"
                    id="input-status"
                    className="form-select"
                    onChange={handleInputChange}
                  >
                    <option>Loại sản phẩm</option>
                    <option value="1">Điện thoại</option>
                    <option value="2">PC và laptop</option>
                    <option value="3">Loa, tai nghe</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="input-price" className="form-label">
                    Giá
                  </label>{" "}
                  <div className="d-flex">
                    <input
                      type="text"
                      name="min_cost_out"
                      placeholder="từ"
                      id="input-price"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="max_cost_out"
                      placeholder="đến"
                      id="input-price"
                      className="form-control"
                      onChange={handleInputChange}
                    />
                  </div>
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
    </>
  );
}

export default ProductsType;
