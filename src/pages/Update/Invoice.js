import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import Button from "src/components/Button";
function UpdateStatusInvoice() {
  const { invoiceId } = useParams();
  const [invoiceById, setInvoiceById] = useState({});
  const [statusInvoice, setStatusInvoice] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getInvoiceById = async () => {
        const res = await invoiceServices.getInvoiceById(invoiceId);
        setInvoiceById(res.data);
      };
      getInvoiceById();
    } catch (error) {
      console.log(error);
    }
  }, [invoiceId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, success, error } =
        await invoiceServices.updateStatusInvoice(invoiceId, {
          status: statusInvoice,
        });
      if (success) {
        alert(`${message}`);
        navigate("/invoices");
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="container-fluid">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="mb-3 w-25">
            <label className="form-label">Invoice ID:</label>
            <input
              className="form-control"
              name="id"
              disabled
              type="text"
              value={invoiceById.id}
            />
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Customer ID:</label>
            <input
              className="form-control"
              disabled
              type="text"
              value={invoiceById.customer_id}
            />
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Phone:</label>
            <input
              className="form-control"
              type="text"
              disabled
              value={invoiceById.receiver_phone}
            />
          </div>
          <div className="mb-3 w-100">
            <label className="form-label">Address:</label>
            <input
              className="form-control"
              disabled
              type="text"
              value={invoiceById.receiver_address}
            />
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Payment Method:</label>
            <input
              className="form-control"
              disabled
              value={invoiceById.payment_method}
            />
          </div>
          <div className="mb-3 w-25">
            <label className="form-label">Status Invoice:</label>
            <select
              className="form-select"
              name="status"
              onChange={(e) => setStatusInvoice(e.target.value)}
            >
              <option value="Bị hủy">Bị hủy</option>
              <option value="Đã hoàn tất">Đã hoàn tất</option>
            </select>
          </div>
        </div>
        <Button className={"btn-primary"} onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default UpdateStatusInvoice;
