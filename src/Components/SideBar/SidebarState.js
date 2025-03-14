import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import "bootstrap/js/dist/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { persistor } from "../../store";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    dispatch(logout());
    await persistor.purge();
    navigate("/", { replace: true });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsDropdownOpen(false); 
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-auto col-md-2 p-0 vh-100 d-flex justify-content-between flex-column"
          style={{ backgroundColor: "#f7f7f7" }}
        >
          <div>
            <ul className="nav nav-pills flex-column">
              <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link p-2"
                  aria-current="page"
                  to="/dashboard"
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-table-columns mainColor"></i>
                  <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                </NavLink>
              </li>
              
              <li className="nav-item text-secondary fs-4 my-1 py-2 py-sm-0">
                <button
                  className="text-secondary fs-5 nav-link p-2"
                  onClick={toggleDropdown}
                >
                  <i className="fa-solid fa-gifts mainColor"></i>
                  <span className="ms-3 d-none d-sm-inline">Products</span>
                </button>
                {isDropdownOpen && (
                  <ul className="list-unstyled">
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/products"
                        onClick={handleLinkClick}
                      >
                        <p className="fs-5 ms-lg-5 ms-3">All Products</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="products/add-product"
                        onClick={handleLinkClick}
                      >
                        <p className="fs-5 ms-lg-5 ms-3">New Product</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/categories"
                        onClick={handleLinkClick}
                      >
                        <p className="fs-5 ms-lg-5 ms-3">Categories</p>                        
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li className="nav-item text-secondary fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link  p-2"
                  aria-current="page"
                  to="/orders"
                  onClick={handleLinkClick}
                >
                  <i className="fab fa-jedi-order mainColor"></i>
                  <span className="ms-3 d-none d-sm-inline">Orders</span>
                </NavLink>
              </li>

              <li className="nav-item text-secondary fs-4 my-1 py-2 py-sm-0">
                <NavLink
                  className="text-secondary fs-5 nav-link p-2"
                  aria-current="page"
                  to="/settings"
                  onClick={handleLinkClick}
                >
                  <i className="fa-solid fa-gear mainColor"></i>
                  <span className="ms-3 d-none d-sm-inline">Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="dropup">
            <a
              className="btn btn-secondary text-white dropdown-toggle px-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa-solid fa-circle-user"></i>
              <span className="mx-2 d-none d-sm-inline">{customer?.fullName}</span>
            </a>
            <div className="dropdown-menu text-center" aria-labelledby="triggerId">
              <button className="btn text-danger" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </button>
            </div>
          </div>
        </div>

        <div className="col vh-100 p-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
