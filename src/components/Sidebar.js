import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faChartPie, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
function Sidebar() {
  const defaultMenu = [
    {
      id: 1,
      path: "/home",
      icon: faHome,
      title: "Trang chủ",
    },
    {
      id: 2,
      path: "/products",
      icon: faProductHunt,
      title: "Sản phẩm",
    },
    {
      id: 3,
      path: "/invoices",
      icon: faCartShopping,
      title: "Hóa đơn",
    },
    {
      id: 4,
      path: "/customer",
      icon: faUser,
      title: "Khách hàng",
    },
    {
      id: 5,
      path: "/reports",
      icon: faChartPie,
      title: "Báo cáo chi tiết",
    },
  ];
  const [isClicked, setIsClicked] = useState(1);
  const handleClickItem = (id) => {
    setIsClicked(id);
  };

  return (
    <aside className="col-2 vh-100 text-white text-opacity-75 position-fixed p-0" style={{ background: "#343a40", zIndex: "1" }}>
      <div className="d-flex align-items-center p-3" style={{ borderBottom: "1px solid #44484d" }}>
        <FontAwesomeIcon icon={faBars} className="me-3" />
        <span>NAVIGATION</span>
      </div>
      {defaultMenu.map((item) => {
        return (
          <div key={item.id}>
            <Menu
              path={item.path}
              icon={item.icon}
              title={item.title}
              classNames={isClicked === item.id ? 'text-light': ''}
              style={isClicked === item.id ? {background: "#929292"} : {}}
              onClick={() => handleClickItem(item.id)}
            />
          </div>
        );
      })}
    </aside>
  );
}

export default Sidebar;
