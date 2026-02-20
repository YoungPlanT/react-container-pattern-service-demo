import React from "react";
import { Link } from "react-router-dom";

import ServiceCardComponent from "../ServiceCard/ServiceCardComponent";

import { useServiceData } from "../../hooks";

import styles from './ServiceList.module.css';

const ServiceList: React.FC = () => {
  const { getService } = useServiceData();
  const services = getService();

  console.log(services);

  return (
    <div className="service-grid">
      {services.map((service) => (
        <Link
          key={ service.slug }
          to={ `/services/${service.slug}` }
          className={ styles['service-link']}
        >
          <ServiceCardComponent
            title={service.title}
            subtitle={service.subtitle}
          />
        </Link>
      ))}
    </div>
  )
}

export default ServiceList;