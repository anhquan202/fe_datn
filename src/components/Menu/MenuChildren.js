import { useState } from "react";
import { NavLink } from "react-router-dom";
import { faAngleDown, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
function MenuChildren({ data, title }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelectedId = (categoryID) => {
    setSelectedCategory(categoryID);
  };
  const handleEventMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="d-flex align-items-center justify-content-between bg-success rounded-2 px-3"
        style={{ padding: "12px 0" }}
        onClick={handleEventMenu}
        role="button"
      >
        <span className="text-center bold">{title}</span>
        <FontAwesomeIcon icon={isMenuOpen ? faAngleDown : faAngleLeft} />
      </div>
      {data && (
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show " : ""}`}
        >
          <ul className="nav">
            {data.map((children) => {
              return (
                <li
                  key={children.id}
                  className={`nav-item w-100 ${
                    selectedCategory === children.id ? "active" : ""
                  }`}
                  onClick={() => handleSelectedId(children.id)}
                >
                  <NavLink
                    to={
                      children.path
                        ? `/${children.path}`
                        : `/productType?typeID=${children.id}`
                    }
                    className="nav-link"
                  >
                    {children.path ? children.name : children.type}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuChildren;
