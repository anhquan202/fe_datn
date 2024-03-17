import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
function Table({ title, headers, data }) {
  return (
    <>
      <div className="card-header">
        <FontAwesomeIcon icon={faList} className="me-3" />
        {title}
      </div>
      <div className="card-body" style={{ fontSize: "14px" }}>
        <table className="table table-striped table-bordered align-middle">
          <thead>
            <tr className="">
              {headers.map((header) => (
                <th key={header} className="text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.keys(item).map(
                  (key) =>
                    key !== "id" && (
                      <td
                        key={key}
                        style={{
                          width: key === "name" ? "240px" : "",
                          textAlign: key === "image" ? "center" : "",
                        }}
                      >
                        {key === "image" ? (
                          <img
                            src={item[key]}
                            alt="failed"
                            style={{ width: "60px", height: "60px" }}
                          />
                        ) : (
                          renderCell(item[key])
                        )}
                      </td>
                    )
                )}
                <td className="text-center">
                  <Button className="btn-primary w-75">Edit</Button>
                  <Button className="btn-danger mt-2 w-75">Del</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
const renderCell = (value) => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toLocaleString(); // Format number
  } else if (typeof value === "boolean") {
    return value ? "Yes" : "No"; // Convert boolean to Yes/No
  } else if (value instanceof Date) {
    return value.toISOString(); // Format date
  } else {
    return JSON.stringify(value); // Render other types as JSON string
  }
};
export default Table;
