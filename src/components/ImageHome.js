import React from "react";
import { useNavigate } from "react-router-dom";
function ImageHome() {
  const navigate = useNavigate();
  return (
    <img
      src="/logo192.png"
      className="img-fluid rounded-top"
      style={{ width: "60px", height: "60px" }}
      alt="Logo"
      onClick={() => {
        navigate("/home");
      }}
    />
  );
}

export default ImageHome;
