import { useState, useEffect } from "react";
import Button from "../Button";

function Form({ inputs, title, onSubmit, errors }) {
  const initialFormData = {};
  inputs.forEach((input) => {
    initialFormData[input.name] = input.value || "";
  });
  const [formData, setFormData] = useState(initialFormData || {});
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    let newValue = value;

    if (type === "file") {
      const file = event.target.files[0];
      newValue = file.name;
    }
    setFormData((prevData) => ({ ...prevData, [name]: newValue }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  console.log(formData);
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
                          value={formData[input.value]}
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
                          value={formData[input.value] || input.value}
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
