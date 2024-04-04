import React from "react";
import Routes from "./Routes";
import Header from "./Header";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid Layout">
      <div className="row">
        <Header />
      </div>
      <div className="row h-100 content m-5">
        {/* <div className="col-md-2 side-bar">
          <Menu />
        </div> */}
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
