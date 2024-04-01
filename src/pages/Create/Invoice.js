import React, { useState, useEffect } from "react";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import Button from "src/components/Button";
import Search from "src/components/Search";
import Table from "src/components/Table";
import { useNavigate } from "react-router-dom";

function OrderForm() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [errors, setErrors] = useState([]);
  const [order, setOrder] = useState({
    receiver_address: "",
    receiver_phone: "",
    payment_method: "",
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
  const navigate = useNavigate();
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
      [name]: value,
    });
  };
  let product_id = null;
  if (selectedProduct) {
    product_id = selectedProduct.id;
  }
  const addProduct = (e) => {
    e.preventDefault();
    try {
      const unit_price = selectedProduct.cost_out;
      const total_price = selectedProduct.cost_out * newProduct.quantity;
      setOrder({
        ...order,
        details: [
          ...order.details,
          { ...newProduct, product_id, unit_price, total_price },
        ],
      });
      setNewProduct({
        product_id: "",
        quantity: 0,
        unit_price: 0,
        total_price: 0,
      });
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
      const {  success, error } = await invoiceServices.postInvoice(order);
      if (success) {
        navigate("/invoices");
      } else {
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
  
  return (
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
            name={"customer_id"}
            onSelected={setSelectedCustomer}
            onKeyChange={()=>{}}
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
        />

        <div className="d-flex align-items-end">
          <label className="me-1">Quantity:</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={newProduct.quantity}
            onChange={handleProductInputChange}
          />
        </div>
        {/* {errors && <p className="text-danger">{errors.quantity}</p>} */}
        <Button className={"btn-primary"} onClick={addProduct}>
          Add product
        </Button>
      </div>
      <div>
        <Table
          title={"Các sản phẩm được chọn"}
          headers={headers}
          data={order.details}
        />
        <p>Total Price: {order.total_amount}</p>
      </div>
      <Button className={"btn-primary"} onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
}

export default OrderForm;
