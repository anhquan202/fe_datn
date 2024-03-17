import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as loginServices from "src/services/login";
import Button from "src/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, success, message } = await loginServices.login(
        email,
        password
      );
      if (success) {
        sessionStorage.setItem("name", data.staff.name);
        navigate("/home");
      } else {
        setError(message);
      }
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần
    }
  };
  return (
    <>
      <div className="bg-danger">{error}</div>
      <div id="content">
        <div className="container-fluid">
          <br />
          <br />
          <div className="row justify-content-sm-center">
            <div className="col-sm-4 col-md-6">
              <div className="card">
                <div className="card-header">
                  <i className="fas fa-lock"></i> Please enter your login details.
                </div>
                <div className="card-body">
                  <form
                    id="form-login"
                    onSubmit={handleSubmit}
                  >
                    <div className="row mb-3">
                      <label for="input-username" className="form-label">
                        Username
                      </label>
                      <div className="input-group">
                        <div className="input-group-text">
                          <i className="fas fa-user"></i>
                        </div>
                        <input
                          type="text"
                          name="username"
                          onChange={(e)=> setEmail(e.target.value)}
                          placeholder="Email"
                          id="input-username"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label for="input-password" className="form-label">
                        Password
                      </label>
                      <div className="input-group mb-2">
                        <div className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </div>
                        <input
                          type="password"
                          name="password"
                          onChange={(e)=>setPassword(e.target.value)}
                          placeholder="Password"
                          id="input-password"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="text-end">
                      <Button className={'btn-primary'}> 
                        <FontAwesomeIcon icon={faKey}/>
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
