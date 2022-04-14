import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = () => {
  return (
    <section className="layout">
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default Layout;
