import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PeriodicTable from "../Assets/PeriodicTable.png";

/**
 * Defines the "Not Found" page that is displayed for any unmatched route.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Header() {
  return (
    <nav className="navbar navbar-fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex m-3" to="/">
          <div className="mx-3">
            <img
              className="d-inline-block align-text-center"
              src={PeriodicTable}
              width="60"
              height="50"
            ></img>
            &nbsp;
            <h2 className="d-inline-block m-0">Periodic Tables</h2>
          </div>
        </Link>

        <ul className="nav navbar-right">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/search">
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reservations/new">
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tables/new">
              <span className="oi oi-layers" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
