import { Timeline } from "primereact/timeline";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useState, useEffect, useRef } from "react";
import * as invoiceServices from "src/services/Invoice/invoiceService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
function Timelines() {
  const [invoice, setInvoice] = useState([]);
  const [sales, setSales] = useState([]);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState();
  let currentDay;
  currentDay = new Date();
  const events = [
    {
      id: 1,
      date: "Hôm nay",
    },
    {
      id: 2,
      date: "Tuần này",
    },
    {
      id: 3,
      date: "Tháng này",
    },
  ];

  const [isShowed, setIsShowed] = useState(false);
  const [isClicked, setIsClicked] = useState(1);
  const timelineRef = useRef(null);

  const handleShow = () => {
    setIsShowed(true);
  };
  const handleDateChange = (range) => {
    const [startDate, endDate] = range;
    setStartDay(startDate);
    setEndDay(endDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (isClicked) {
          case 1:
            const invoiceToday = await invoiceServices.getInvoiceByDay();
            const salesToday = await invoiceServices.getSalesByDay();
            setInvoice(invoiceToday.data);
            setSales(salesToday.data);
            break;
          case 2:
            const invoiceThisWeek = await invoiceServices.getInvoiceByWeek();
            const salesThisWeek = await invoiceServices.getSalesByWeek();
            setInvoice(invoiceThisWeek.data);
            setSales(salesThisWeek.data);
            break;
          case 3:
            const invoiceByMonth = await invoiceServices.getInvoiceByMonth();
            const saleByMonth = await invoiceServices.getSalesByMonth();
            setInvoice(invoiceByMonth.data);
            setSales(saleByMonth.data);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [isClicked]);
  useEffect(() => {
    const fetchDataByDateRange = async () => {
      try {
        if (startDay && endDay) {
          // Call your API here with startDay and endDay parameters
          const startDayString = formatDate(startDay);
          const endDayString = formatDate(endDay);
          const data = await invoiceServices.getReportsByTime(startDayString, endDayString);
          setInvoice(data.data.invoices.original);
          setSales(data.data.sales.original);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataByDateRange();
  }, [startDay, endDay]);
  // Hàm chuyển đổi Date thành chuỗi "yyyy-mm-dd"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleClickOutside = (event) => {
    if (timelineRef.current && !timelineRef.current.contains(event.target)) {
      setIsShowed(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="" style={{ width: 850, maxWidth: "inherit" }} ref={timelineRef} onClick={handleShow}>
        <div className="border py-2 ps-2 d-flex align-items-center mb-3" style={{ height: 36, cursor: "pointer" }}>
          <span>
            {startDay && endDay
              ? `${startDay.toLocaleDateString("en-GB")} - ${endDay.toLocaleDateString("en-GB")}`
              : `Hôm nay ${currentDay.toLocaleDateString("en-GB")}`}
          </span>
        </div>
        {isShowed && (
          <div
            className="d-flex flex-column t-0 bg-white p-2"
            style={{ position: "fixed", zIndex: 33, width: "30%", height: 360, boxShadow: "5px 10px 15px 5px rgba(0,0,0,0.3)" }}
          >
            <div className="d-flex mb-3">
              <span className="me-2">Tùy chọn</span>
              <DatePicker selected={currentDay} onChange={handleDateChange} startDate={startDay} endDate={endDay} selectsRange />
            </div>
            <div className="">
              <p className="">
                <b>Chọn nhanh</b>
              </p>
              <Timeline
                value={events}
                content={(item) => (
                  <div
                    className={`px-2 ${item.id % 2 === 0 ? "rounded-end" : "rounded-start"} border ${
                      isClicked === item.id ? "bg-primary text-white" : ""
                    } `}
                    style={{ height: 36, cursor: "pointer" }}
                    onClick={() => setIsClicked(item.id)}
                  >
                    {item.date}
                  </div>
                )}
                align="alternate"
              />
            </div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <div style={{ width: "47%" }}>
          <p className="text-center">Số hóa đơn</p>
          <Bar
            data={{
              labels: invoice.length > 0 ? invoice.map((item) => (item.hour ? item.hour + "h" : item.day ? item.day : item.month)) : [],
              datasets: [
                {
                  label: isClicked === 1 ? "Hôm nay" : isClicked === 2 ? "Tuần này" : "Tháng này",
                  data: invoice.length > 0 ? invoice.map((item) => item.total) : [],
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 1, // Độ chia của trục tung
                  },
                  max: Math.max(...invoice.map((item) => item.total)) + 1,
                },
              },
            }}
          />
        </div>
        <div style={{ width: "47%" }}>
          <p className="text-center">Doanh thu</p>
          <Bar
            data={{
              labels: sales.length > 0 ? sales.map((item) => (item.hour ? item.hour + "h" : item.day ? item.day : item.month)) : [],
              datasets: [
                {
                  label: isClicked === 1 ? "Hôm nay" : isClicked === 2 ? "Tuần này" : "Tháng này",
                  data: sales.length > 0 ? sales.map((item) => item.total) : [],
                  backgroundColor: "rgba(54, 162, 235, 0.5)",
                  borderColor: "rgba(54, 162, 235, 1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  ticks: {
                    stepSize: 10000000, // Độ chia của trục tung
                  },
                  max: Math.max(...sales.map((item) => item.total)) + 20000000,
                },
              },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Timelines;
