import { useEffect, useState } from "react";
import * as customerServices from "src/services/Customer/customerServices";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Statistics from "./Count";
function TotalCustomer() {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const title = "Total Customer";
  useEffect(() => {
    const getTotalCustomer = async () => {
      try {
        const res = await customerServices.getTotalCustomer();
        setTotalCustomer(res);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalCustomer();
  }, [totalCustomer]);
  return (
    <>
      <Statistics
        data={totalCustomer}
        title={title}
        icon={faUser}
        to={""}
      />
    </>
  );
}

export default TotalCustomer;
