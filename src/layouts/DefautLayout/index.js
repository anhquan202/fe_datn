import Header from "src/components/Header";
import Sidebar from "../../components/Sidebar";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="row mx-0 contenet" style={{paddingTop:'80px'}}>
        <Sidebar />
        <div className="col-10 px-4 pt-5 content">
            <div className="card border-0 pt-3">{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
