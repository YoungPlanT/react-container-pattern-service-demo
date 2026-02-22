import styles from "./BulletedListSection.module.css";
import type { BulletedListSection } from "../../../schemas/service.schema";

interface BulletedListSectionProps {
  data: BulletedListSection;
}

export const BulletedListSectionComponent = ({ data }: BulletedListSectionProps) => {
  const listItems = Object.entries(data.bulleted_list_data || {});
  
  if (listItems.length === 0) {
    return null;
  }

  return (
    <div className={styles['service-detail__bulleted-section']}>
      {data.title && (
        <h2 className={styles['bulleted-section__title']}>
          {data.title}
        </h2>
      )}
      
      <ul className={styles['bulleted-section__list']}>
        {listItems.map(([key, item]) => (
          <li 
            key={`bullet-${key}`} 
            className={styles['bulleted-section__item']}
          >
            {item.img_path ? (
              <div className={styles['item__with-icon']}>
                <img 
                  src={item.img_path} 
                  alt="" 
                  className={styles['item__icon']}
                  aria-hidden="true"
                />
                <span className={styles['item__text']}>{item.data}</span>
              </div>
            ) : (
              <>
              {/* TODO: image */}
                <span className={styles['item__bullet']}>•</span>
                <span className={styles['item__text']}>{item.data}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};