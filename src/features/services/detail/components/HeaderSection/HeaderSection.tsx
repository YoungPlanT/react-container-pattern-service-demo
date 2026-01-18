import React from "react";
import type { HeaderSectionProps } from '../../types/ServicesDetail.interface';
import styles from "./HeaderSection.module.css";

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title_emphasized_part,
  title_base_part,
  sub_title
}) => {
  return (
    <div className={ styles['service-detail__header-section'] }>
      <div className={ styles['header-section__title'] }>
        <h1 className={ styles['title__emphasized-part__text'] }>
          { title_emphasized_part }
        </h1>
        <h2 className={ styles['title__base-part__text'] }>
          { title_base_part }
        </h2>
      </div>
      <div className={ styles["header-section__subtitle"] }>
          <h3 className={ styles["subtitle__text"] }>
            { sub_title }
          </h3>
      </div>
    </div>
  )
};

export default HeaderSection;