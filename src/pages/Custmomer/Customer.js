import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Pagination from "src/components/Paginate";
import Table from "src/components/Table";
import * as customerServices from "src/services/Customer/customerServices";
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getCustomer = async () => {
        const { data, totalPage } = await customerServices.getCustomer(
          currentPage
        );
        setCustomers(data);
        setTotalPage(totalPage);
        setCurrentPage(currentPage);
      };
      getCustomer();
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/customer?current_page=${pageNumber}`);
  };
  const headers = ["Name", "Phone", "Gender", "Email"];
  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="mb-3">
          <Link to={"/customer/create"} className="btn btn-primary">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
      <Table
        title={"Danh sách khách hàng"}
        headers={headers}
        data={customers}
        disabled
      />
      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Customer;
