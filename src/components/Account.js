import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
function Account() {
  const name = sessionStorage.getItem("name");
  return (
    <div className="d-flex align-items-center my-3 p-3">
      <FontAwesomeIcon icon={faUser} style={{width:'34px', height:'inherit'}}/>
      <span className="ps-3">{name}</span>
    </div>
  );
}

export default Account;
