import styles from './ButtonSection.module.css';
import type { ButtonSection } from '../../../types';

interface ButtonSectionComponentProps {
  data: ButtonSection;
};

export const ButtonSectionComponent = ({ data }: ButtonSectionComponentProps) => {
  return (
    <div className={styles['service-detail__button-section']}>
      <button className={styles['button-section__button']}>
        {data.text_on_button}
      </button>
    </div>
  );
};