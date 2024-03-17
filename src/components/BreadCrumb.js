import { Link, useLocation } from 'react-router-dom';

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li className={`breadcrumb-item ${isLast ? 'active' : ''}`} key={name}>
              {isLast ? name : <Link to={routeTo}>{name}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
