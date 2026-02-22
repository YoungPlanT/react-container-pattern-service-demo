import styles from './CardSection.module.css';

import type { CardSection } from "../../../types";


interface CardSectionProps {
  data: CardSection;
};

export const CardSectionComponent = ({ data }: CardSectionProps) => {
  if (!data.cards_data || data.cards_data.length === 0) {
    return null;
  }

  return (
     <div className={styles['service-detail__card-section']}>
      {data.title && (
        <h2 className={styles['card-section__title']}>
          {data.title}
        </h2>
      )}
      
      <div className={styles['card-section__grid']}>
        {data.cards_data.map((cardText, index) => (
          <div 
            key={`card-${index}`} 
            className={styles['card-section__item']}
          >
            <p className={styles['card__text']}>
              {cardText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};