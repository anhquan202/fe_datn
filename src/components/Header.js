import ImageHome from "./ImageHome";
import Account from "./Account";
function Header() {
  return (
    <div className="container-fluid position-fixed bg-primary" style={{zIndex:'1'}}>
        <div className="d-flex align-items-center justify-content-between container" style={{height:'80px'}}>
          <ImageHome />
          <Account/>
        </div>
    </div>
  );
}

export default Header;
