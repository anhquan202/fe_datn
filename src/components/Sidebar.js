import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
function Sidebar() {
  return (
    <aside
      className="col-2 vh-100 text-white text-opacity-75 position-fixed p-0"
      style={{ background: "#343a40", zIndex: "1" }}
    >
      <div className="d-flex align-items-center p-3" style={{borderBottom: '1px solid #44484d'}}>
        <FontAwesomeIcon icon={faBars} className="me-3" />
        <span>NAVIGATION</span>
      </div>
      <Menu path={"/home"} icon={faHome} title={"Trang chủ"} />
      <Menu path={"/products"} icon={faProductHunt} title={"Sản phẩm"} />
      <Menu path={"/invoices"} icon={faCartShopping} title={"Hóa đơn"} />
      <Menu path={"/customer"} icon={faUser} title={"Khách hàng"} />
    </aside>
  );
}

export default Sidebar;
