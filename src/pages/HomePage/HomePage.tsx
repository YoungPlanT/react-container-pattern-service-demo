import React from "react";
import ServiceList from "../features/services/components/ServiceList/ServiceList";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <ServiceList />
    </div>
  )
};

export default HomePage;