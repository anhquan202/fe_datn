import Table from "src/components/Table";
import { useNavigate } from "react-router-dom";
function PhoneDetail({ data, titleHeader }) {
  const navigate = useNavigate();
  const headers = [
    "Màu",
    "Camera",
    "Màn hình",
    "HĐH",
    "RAM",
    "ROM",
    "Mô tả chi tiết",
    "Tên sản phẩm",
    "Thao tác",
  ];
  const handleEdit = (productId) => {
    navigate(`/product/updateDetail/${productId}?type_id=1`);
  };
  const handleDelete = () => {};
  return (
    <div className="d-flex">
      <Table
        headers={headers}
        data={data}
        title={titleHeader}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default PhoneDetail;
