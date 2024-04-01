import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "src/components/Button";
import { Modal } from "react-bootstrap";
import Form from "src/components/Form/Form";
import * as productService from "src/services/Product/productService";
function UpdateProduct() {
  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  useEffect(() => {
    try {
      const getProduct = async () => {
        const data = await productService.getProductById(productId);
        setProduct(data);
      };
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }, [productId]);
  if (!product) {
    return;
  }
  const title = "Cập nhật sản phẩm";
  const inputs = [
    {
      type: "text",
      name: "name",
      label: "Product name",
      placeholder: "Product name",
    },
    {
      type: "text",
      name: "cost_in",
      label: "Cost in",
      placeholder: "Cost in",
    },
    {
      type: "text",
      name: "cost_out",
      label: "Cost out",
      placeholder: "Cost out",
    },
    {
      type: "number",
      name: "quantity",
      label: "Quantity",
      placeholder: "Quantity",
      min: 1,
    },
    { type: "file", name: "image", label: "Choose file:" },
    {
      type: "select",
      name: "type_id",
      label: "Type",
      options: [
        { value: 1, label: "Điện thoại" },
        { value: 2, label: "PC và laptop" },
        { value: 3, label: "Loa, tai nghe" },
      ],
    },
    {
      type: "select",
      name: "manufacture",
      label: "Manufacture",
      options: [
        { value: 1, label: "Apple" },
        { value: 2, label: "Samsung" },
        { value: 3, label: "Xiaomi" },
      ],
    },
  ];
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async (formData) => {
    try {
      const { success, error } = await productService.putProduct(
        productId,
        formData
      );
      if (success) {
        setShowModal(true);
      } else {
        setShowModal(false);
        setErrors(error);
        const timeout = setTimeout(() => {
          setErrors([]);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      navigate(
        `/product/updateDetail/${product.id}?type_id=${product.type_id}`
      );
    } else {
      navigate(`/products`);
    }
  };
  return (
    <>
      <Form
        inputs={inputs}
        title={title}
        data={product}
        onSubmit={handleSubmit}
        errors={errors}
      />

      {showModal && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update prduct Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn đã sửa thành công thông tin chung, hãy chọn 'No' nếu không muốn
            sửa chi tiết sản phẩm, ngược lại thì chọn 'Yes'
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => handleConfirmation(false)}
            >
              No
            </Button>
            <Button variant="primary" onClick={() => handleConfirmation(true)}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default UpdateProduct;
