import { Outlet, Link } from "react-router-dom";
import "./Layout.css"


const Layout = () => {
  return (
    <>
     <nav className="wrap_router">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li >
            <Link to="/detail" id="page_second">Detail</Link>
          </li>
        </ul>
      </nav> 
      <Outlet />
    </>
  )
};

export default Layout;