import Button from "./Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import * as productServices from "src/services/Product/productService";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import ProductDetail from "src/pages/Products/Details/ProductDetail";
import InvoiceDetail from "src/pages/Invoice/InvoiceDetail";
function Table({
  title,
  headers,
  data,
  onEdit,
  styleCss,
  disabled = false,
  select,
  classNames,
  dataType,
  showDeleteButton = true,
  showEditButton = true,
  showModalDelete
}) {
  const [detailData, setDetailData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeId, setTypeId] = useState();
  const handleClickItem = async (typeId, id) => {
    try {
      let data;
      switch (dataType) {
        case "product":
          data = await productServices.getProductDetail(typeId, id);
          break;
        case "invoice":
          data = await invoiceServices.getInvoiceDetail(id);
          break;
        default:
          break;
      }
      setDetailData(data);
      setTypeId(typeId);
      setShowModal(true);
    } catch (error) {
      console.log(error);
    }
  };
  const closeModal = () => {
    setShowModal(false);
    setDetailData(null);
  };
  return (
    <>
      <Modal show={showModal} onHide={closeModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataType === "product" && detailData && (
            <ProductDetail typeId={typeId} data={detailData} />
          )}
          {dataType === "invoice" && detailData && (
            <InvoiceDetail data={detailData} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className={'btn-danger'} onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`card pt-4 ${styleCss}`} style={{ fontSize: "14px" }}>
        <div
          className={`card-header d-flex justify-content-between align-items-center ${classNames}`}
        >
          <div style={{ fontSize: 18 }}>
            <FontAwesomeIcon icon={faList} className="me-3" />
            {title}
          </div>
          {select}
        </div>
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr className="">
              {headers.map((header) => (
                <th key={header} className="text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleClickItem(item.type_id, item.id)}
                >
                  {Object.keys(item).map(
                    (key) =>
                      key !== "id" &&
                      key !== "type_id" && (
                        <td
                          key={key}
                          style={{
                            maxWidth: 240,
                            width: key === ("name" && "product") ? "200px" : "",
                            textAlign: key === "image" ? "center" : "",
                          }}
                        >
                          {key === "image" ? (
                            <img
                              src={
                                `http://127.0.0.1:8000/storage/${item[key]}` ||
                                item[key]
                              }
                              style={{ width: "60px", height: "60px" }}
                              alt="failed"
                            />
                          ) : (
                            renderCell(item[key])
                          )}
                        </td>
                      )
                  )}
                  <td className={`text-center ${disabled ? "d-none" : ""}`}>
                    {showEditButton && (
                      <Button
                        className="btn-primary w-75"
                        onClick={(e) => onEdit(e,item.id)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Button>
                    )}
                    {showDeleteButton && (
                      <Button
                        className="btn-danger mt-2 w-75"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          showModalDelete(item.id || item.product_id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
const renderCell = (value) => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toLocaleString(); // Format number
  } else if (typeof value === "boolean") {
    return value ? "Yes" : "No"; // Convert boolean to Yes/No
  } else if (value instanceof Date) {
    return value.toISOString(); // Format date
  } else {
    return JSON.stringify(value); // Render other types as JSON string
  }
};
export default Table;
