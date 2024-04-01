import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
function Account() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('staffName');
    alert('Bạn đã đăng xuất khỏi hệ thống')
    navigate('/');
  }
  const name = sessionStorage.getItem("staffName");
  return (
    <div className="d-flex align-items-center p-3 text-white">
      <FontAwesomeIcon icon={faUser} style={{width:'34px', height:'inherit'}}/>
      <span className="ps-3">{name}</span>
      <div className="ms-2" onClick={handleLogout} style={{cursor:'pointer', lineHeight:3}}>
        <FontAwesomeIcon icon={faArrowRight}/>
        Log out
      </div>
    </div>
  );
}

export default Account;
