import React from "react";
// import styles from './ServiceCardComponent.module.css';

interface ServiceCardComponentProps {
  title: string,
  sub_title: string
}

const ServiceCardComponent: React.FC<ServiceCardComponentProps> = ({
  title,
  sub_title
}) => {
  return(
    <div>
      <div>
        <h2>{ title }</h2>
      </div>
      <div>
        <h2>{ sub_title }</h2>
      </div>
    </div>
  )
};

export default ServiceCardComponent;