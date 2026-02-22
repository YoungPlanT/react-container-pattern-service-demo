import styles from './NumberedListSection.module.css';
import type { NumberedListSection } from '../../../types';

interface NumberedListSectionProps {
  data: NumberedListSection;
}

export const NumberedListSectionComponent = ({ data }: NumberedListSectionProps) => {
if (!data.numbered_list_data || data.numbered_list_data.length === 0) {
    return null;
  }

  return (
    <div className={styles['service-detail__numbered-section']}>
      {data.title && (
        <h2 className={styles['numbered-section__title']}>
          {data.title}
        </h2>
      )}
      
      <ol className={styles['numbered-section__list']}>
        {data.numbered_list_data.map((item, index) => (
          <li 
            key={`numbered-${index}`} 
            className={styles['numbered-section__item']}
          >
            <div className={styles['item__number']}>
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <span className={styles['item__text']}>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};