import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function Statistics({title, icon, data, to}) {
  return (
    <>
      <div className="col-lg-3 col-md-3 col-sm-6">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <div className="card-title">
              {title}
            </div>
            <div className="card-body px-0 d-flex justify-content-between align-items-center" style={{fontSize:24}}>
              <FontAwesomeIcon icon={icon} />
              <span>{data}</span>
            </div>
            <div className="card-footer">
              <Link to={to}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
