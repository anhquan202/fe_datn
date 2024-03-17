
import ProductDetail from "./Menu/ProductDetail";
import Product from "./Menu/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Sidebar() {
  return (
    <aside className="col-2 vh-100 text-white text-opacity-75 position-fixed" style={{background:'#343a40', zIndex:'1'}}>
      <div className="d-flex align-items-center py-3">
        <FontAwesomeIcon icon={faBars} className="me-3"/>
        <span>NAVIGATION</span>
      </div>
      <Product/>
      <ProductDetail/>
    </aside>
  );
}

export default Sidebar;
