import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <aside
      className="col-2 vh-100 text-white text-opacity-75 position-fixed"
      style={{ background: "#343a40", zIndex: "1" }}
    >
      <div className="d-flex align-items-center py-3">
        <FontAwesomeIcon icon={faBars} className="me-3" />
        <span>NAVIGATION</span>
      </div>
      <div
        className="d-flex align-items-center justify-content-between bg-success rounded-2 px-3"
        style={{ padding: "12px 0" }}
      >
        <Link to="/products" className="text-decoration-none">
          Sản phẩm
        </Link>
      </div>
      <div
        className="d-flex align-items-center justify-content-between bg-success rounded-2 px-3  mt-3"
        style={{ padding: "12px 0" }}
      >
        <Link to="/invoices" className="text-decoration-none">
          Sản phẩm
        </Link>
      </div>
      <div
        className="d-flex align-items-center justify-content-between bg-success rounded-2 px-3 mt-3"
        style={{ padding: "12px 0" }}
      >
        <Link to="/customer" className="text-decoration-none">
          Sản phẩm
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
