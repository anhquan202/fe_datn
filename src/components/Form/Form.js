import { useEffect, useState } from "react";
import Button from "../Button";

function Form({ inputs, title, data, onSubmit, errors }) {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [dataToSend, setDataToSend] = useState(new FormData());
  useEffect(() => {
    // Nếu props data tồn tại, thiết lập formData bằng data
    if (data) {
      setFormData(data);
    } else {
      setFormData({}); // Nếu không, thiết lập formData là rỗng
    }
  }, [data]);
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let newValue = value;
    if (type === "file") {
      const file = event.target.files[0];
      newValue = file.name;
      setFile(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file, // set giá trị của trường "image" là file object
      }));
    } else if (type === "number" && value === "") {
      newValue = "";
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };
  useEffect(() => {
    const dataToSend = new FormData();
    if (file) {
      dataToSend.append("image", file);
    }
    Object.entries(formData).forEach(([key, value]) => {
      dataToSend.append(key, value);
    });
    setDataToSend(dataToSend);
  }, [formData, file]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const method = dataToSend.get("_method") || "POST";
    if (method === "POST" && window.location.pathname.endsWith(`${formData.id}`)) {
      dataToSend.append("_method", "PUT");
    }
    onSubmit(dataToSend);
  };
  return (
    <div className="row w-100 justify-content-center">
      <div className="col-md-10">
        <div className="card card-primary">
          <div className="card-header">
            <h5 className="card-title">{title}</h5>
          </div>
          <form onSubmit={handleSubmit}>
            {inputs.map((input, index) => {
              return (
                <div key={index} className="d-flex card-header">
                  <label
                    htmlFor={input.name}
                    className="form-label col-sm-2 col-form-label"
                  >
                    {input.label}
                  </label>
                  <div className="col-sm-10">
                    {input.type === "file" ? (
                      <>
                        <input
                          type={input.type}
                          id={input.name}
                          name={input.name}
                          className="form-control"
                          onChange={handleChange}
                        />
                        {data && (
                          <img
                            src={`http://127.0.0.1:8000/storage/${input.image}`}
                            alt="Failed"
                            style={{ width: "100px", height: "100px" }}
                          />
                        )}
                        {errors[input.name] && (
                          <p style={{ color: "red" }}>{errors[input.name]}</p>
                        )}
                      </>
                    ) : input.type === "select" ? (
                      <>
                        <select
                          id={input.name}
                          name={input.name}
                          className="form-select"
                          value={formData[input.name] || ""}
                          onChange={handleChange}
                        >
                          {input.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors[input.name] && (
                          <p style={{ color: "red" }}>{errors[input.name]}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <input
                          type={input.type}
                          name={input.name}
                          value={formData[input.name] || ""}
                          className="form-control"
                          placeholder={input.placeholder}
                          min={input.min}
                          disabled={input.disabled}
                          onChange={handleChange}
                        />
                        {errors[input.name] && (
                          <p style={{ color: "red" }}>{errors[input.name]}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <Button className="btn-primary my-2 me-3 float-end">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
