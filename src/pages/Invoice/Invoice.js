import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import * as invoiceService from "src/services/Invoice/invoiceService";
import Table from "src/components/Table";
import Pagination from "src/components/Paginate";
function Invoice() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getInvoice = async () => {
        const { data, totalPage } = await invoiceService.getInvoice(
          currentPage
        );
        setInvoices(data);
        setCurrentPage(currentPage);
        setTotalPage(totalPage);
      };
      getInvoice();
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  const headers = [
    "Địa chỉ nhận",
    "SĐT",
    "Tổng tiền",
    "Thanh toán",
    "Ngày tạo",
    "Tình trạng",
    "Mã khách hàng",
    "Ngày bán",
  ];
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const modifiedInvoices = invoices.map((invoice) => {
    const { details, customer, ...rest } = invoice;
    return rest; // Trả về đối tượng chỉ chứa các thông tin không phải details và customer
  });
  const handleEdit = (event, id) => {
    event.stopPropagation();
    navigate(`/invoice/updateStatus/${id}`)
  };
  return (
    <>
      <div className="d-flex py-3">
        <div className="container-fluid">
          <div className="float-end">
            <Link to={"/invoice/create"} className="btn btn-primary">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </div>
      </div>
      <Table
        data={modifiedInvoices}
        headers={headers}
        title={"Hóa đơn"}
        dataType={"invoice"}
        showDeleteButton={false}
        onEdit={handleEdit}
      />
      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Invoice;
