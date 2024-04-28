import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function Menu({ path, icon, title, onClick, classNames, style }) {
  return (
    <>
      <div
        className="d-flex align-items-center hover"
        style={{ padding: "12px 16px", borderBottom: "1px solid #44484d", ...style }}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} style={{ width: 18, height: 18 }} />
        <Link to={`${path}`} className={`text-decoration-none ms-3 w-100 ${classNames}`}>
          {title}
        </Link>
      </div>
    </>
  );
}

export default Menu;
