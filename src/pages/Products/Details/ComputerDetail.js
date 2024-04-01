import Table from "src/components/Table";
import { useNavigate } from "react-router-dom";
function ComputersDetail({data, titleHeader}) {
  const navigate = useNavigate();
  const headers = [
    "Loại",
    "CPU",
    "RAM",
    "Ổ nhớ",
    "Card đồ họa",
    "HĐH",
    "Mô tả chi tiết",
    "Tên sản phẩm",
    "Thao tác",
  ];
  const handleEdit = (productId) => {
    navigate(`/product/updateDetail/${productId}?type_id=2`);
  };
  const handleDelete = () => {};
  return (
    <div className="container">
      <div className="d-flex">
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

export default ComputersDetail;
