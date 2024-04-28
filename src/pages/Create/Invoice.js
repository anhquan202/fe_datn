import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import { Modal } from "react-bootstrap";
import Button from "src/components/Button";
import Search from "src/components/Search";
import Table from "src/components/Table";
function OrderForm() {
  const [showModal, setShowModal] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [order, setOrder] = useState({
    receiver_address: "",
    receiver_phone: "",
    payment_method: "Tiền mặt",
    details: [],
    total_amount: 0,
    customer_id: 0,
  });
  const [newProduct, setNewProduct] = useState({
    product_id: "",
    quantity: 0,
    unit_price: 0,
    total_price: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };
  useEffect(() => {
    if (selectedCustomer) {
      setOrder({
        ...order,
        customer_id: selectedCustomer.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCustomer]);
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      [name]: parseInt(value),
    });
  };
  let product_id = null;
  if (selectedProduct) {
    product_id = selectedProduct.id;
  }
  const addProduct = (e) => {
    e.preventDefault();
    try {
      const existingProductIndex = order.details.findIndex(
        (product) => product.product_id === product_id
      );

      if (existingProductIndex !== -1) {
        const updatedDetails = [...order.details];
        updatedDetails[existingProductIndex].quantity += newProduct.quantity;
        updatedDetails[existingProductIndex].total_price +=
          selectedProduct.cost_out * newProduct.quantity;

        setOrder({
          ...order,
          details: updatedDetails,
        });
      } else {
        const unit_price = selectedProduct.cost_out;
        const total_price = selectedProduct.cost_out * newProduct.quantity;

        setOrder({
          ...order,
          details: [
            ...order.details,
            { ...newProduct, product_id, unit_price, total_price },
          ],
        });
      }
      setNewProduct({
        product_id: "",
        quantity: 0,
        unit_price: 0,
        total_price: 0,
      });
      setSearchProduct("");
      setSelectedProduct(null);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      order.details.forEach((product) => {
        total += product.total_price;
      });
      setOrder({
        ...order,
        total_amount: total,
      });
    };

    calculateTotalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.details]);
  const headers = [
    "ProductId",
    "Quantity",
    "Đơn giá",
    "Thành tiền",
    "Thao tác",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, error } = await invoiceServices.postInvoice(order);
      if (success) {
        alert("Đơn hàng được tạo thành công");
        navigate("/invoices");
      } else {
        if (error.details) {
          const confirmed = window.confirm(`${error.details}`);
          if (confirmed) {
            setErrors([]);
          }
        }
        setErrors(error);
        const timeout = setTimeout(() => {
          setErrors([]);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowDeleteModal = (productId) => {
    setSelectedProduct(productId);
    setShowModal(true);
  };
  const handleDeleteItemCart = () => {
    const index = order.details.findIndex(
      (product) => product.product_id === selectedProduct
    );
    if (index !== -1) {
      // Tạo một bản sao của mảng details
      const updatedDetails = [...order.details];
      // Loại bỏ sản phẩm khỏi mảng
      updatedDetails.splice(index, 1);
      // Cập nhật lại order với details mới
      setOrder({
        ...order,
        details: updatedDetails,
      });
    }
    setShowModal(false);
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
            onClick={handleDeleteItemCart}
          >
            Đồng ý
          </Button>
        </Modal.Footer>
      </Modal>
      <form className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="mb-3 w-100">
            <label className="form-label">Address:</label>
            <input
              className="form-control"
              type="text"
              name="receiver_address"
              value={order.address}
              onChange={handleInputChange}
            />
            {errors && <p className="text-danger">{errors.receiver_address}</p>}
          </div>
          <div className="mb-3 col-4">
            <label className="form-label">Customer:</label>
            <Search
              placeholder={"customer"}
              api={"/customers/search"}
              name={"customer_name"}
              onSelected={setSelectedCustomer}
            />
            {errors && <p className="text-danger">{errors.customer_id}</p>}
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Phone:</label>
            <input
              className="form-control"
              type="text"
              name="receiver_phone"
              value={order.phone}
              onChange={handleInputChange}
            />
            {errors && <p className="text-danger">{errors.receiver_phone}</p>}
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Payment Method:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="payment_method"
              value={order.payment_method}
              onChange={handleInputChange}
            >
              <option>Tiền mặt</option>
              <option>Chuyển khoản</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end py-3">
          <Search
            placeholder={"Tim kiem san pham..."}
            api={"products/search"}
            name={"product_name"}
            className={"w-50"}
            onSelected={setSelectedProduct}
            value={searchProduct}
          />

          <div className="d-flex align-items-end">
            <div>
              <label className="me-1">Quantity:</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                min={1}
                value={newProduct.quantity}
                onChange={handleProductInputChange}
              />
            </div>
            {errors.errorQuantity && (
              <p className="text-danger">{errors.errorQuantity}</p>
            )}
          </div>
          <Button className={"btn-primary"} onClick={addProduct}>
            Add product
          </Button>
        </div>
        <div>
          <Table
            title={"Các sản phẩm được chọn"}
            headers={headers}
            data={order.details}
            showEditButton={false}
            showModalDelete={handleShowDeleteModal}
          />
          <p>Total Price: {order.total_amount.toLocaleString()}</p>
        </div>
        <Button className={"btn-primary"} onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default OrderForm;
