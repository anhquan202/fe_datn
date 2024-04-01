import Table from "src/components/Table";
import { useNavigate } from "react-router-dom";
function AudioDetails({ data, titleHeader }) {
  const navigate = useNavigate();
  const headers = [
    "Loại",
    "Kết nối",
    "Màu",
    "driver_size",
    "Chiều dài dây",
    "Thời gian sạc",
    "usage_time",
    "description",
    "Tên sản phẩm",
    "Thao tác",
  ];

  const handleEdit = (productId) => {
    navigate(`/product/updateDetail/${productId}?type_id=3`);
  };

  const handleDelete = () => {};
  return (
    <div className="container">
      <div className="d-flex ">
        <Table
          headers={headers}
          data={data}
          title={titleHeader}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default AudioDetails;
