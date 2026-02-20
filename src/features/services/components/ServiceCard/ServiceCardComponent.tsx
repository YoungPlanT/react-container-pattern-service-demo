import React from "react";
import styles from './ServiceCardComponent.module.css';

interface ServiceCardComponentProps {
  title: string,
  subtitle: string
}

const ServiceCardComponent: React.FC<ServiceCardComponentProps> = ({
  title,
  subtitle
}) => {
  return(
    <div className={ styles['card'] }>
      <div>
        <h2>{ title }</h2>
      </div>
      <div>
        <h2>{ subtitle }</h2>
      </div>
    </div>
  )
};

export default ServiceCardComponent;