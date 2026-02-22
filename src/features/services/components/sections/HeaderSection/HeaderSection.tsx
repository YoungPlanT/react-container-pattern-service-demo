import styles from "./HeaderSection.module.css";

import type { HeaderSection } from "../../../schemas/service.schema"; 

interface HeaderSectionProps {
  data: HeaderSection;
}

export const HeaderSectionComponent = ({ data }: HeaderSectionProps) => {
  return (
    <div className={styles['service-detail__header-section']}>
      <div className={styles['header-section__title-wrapper']}>
        {data.title_emphasized_part && (
          <span className={styles['title__emphasized-part']}>
            {data.title_emphasized_part}
          </span>
        )}
        <h1 className={styles['title__base-part']}>
          {data.title_base_part}
        </h1>
      </div>
      
      {data.sub_title && (
        <div className={styles['header-section__subtitle-wrapper']}>
          <p className={styles['subtitle__text']}>
            {data.sub_title}
          </p>
        </div>
      )}
    </div>
  );
};