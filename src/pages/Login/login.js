import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as loginServices from "src/services/login";
import Button from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, success, error } = await loginServices.login(
        email,
        password
      );
      if (success) {
        alert('Đăng nhập thành công')
        sessionStorage.setItem("staffName", data.staff.name);
        navigate("/home");
      } else {
        setErrors(error);
        const timeout = setTimeout(() => {
          setErrors({});
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần
    }
  };
  console.log(typeof errors);
  return (
    <>
      <div id="content">
        <div className="container-fluid">
          <br />
          <br />
          <div className="row justify-content-sm-center">
            <div className="col-sm-4 col-md-6">
              <div className="card">
                <div className="card-header">
                  <FontAwesomeIcon icon={faLock} />
                  Please enter your login details.
                </div>
                <div className="card-body">
                  <form id="form-login" onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <label className="form-label">Username</label>
                      <div className="input-group">
                        <div className="input-group-text">
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <input
                          type="text"
                          name="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          className={`form-control ${
                            errors.email ? "is-invalid" : ""
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-danger">{errors.email}</p>
                      )}
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="input-password" className="form-label">
                        Password
                      </label>
                      <div className="input-group mb-2">
                        <div className="input-group-text">
                          <FontAwesomeIcon icon={faLock} />
                        </div>
                        <input
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          id="input-password"
                          className={`form-control ${
                            errors.password && "is-invalid"
                          }`}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-danger">{errors.password}</p>
                      )}
                    </div>
                    {errors && typeof errors === "string" && (
                      <p className="text-danger">{errors}</p>
                    )}
                    <div className="text-end">
                      <Button className={"btn-primary"}>
                        <FontAwesomeIcon icon={faKey} />
                        Login
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
