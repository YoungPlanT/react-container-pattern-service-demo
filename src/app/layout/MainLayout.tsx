import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return(
    <div className="app">
      {/* <Header /> */}

      <main className="main-content">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  )
};

export default MainLayout;