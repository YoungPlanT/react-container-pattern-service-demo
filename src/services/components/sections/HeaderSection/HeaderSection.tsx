import React from "react";
import styles from "./HeaderSection.module.css";

import type { HeaderSection } from "../../../schemas/service.schema"; 

interface HeaderSectionProps {
  data: HeaderSection;
}

const HeaderSectionComponent = ({ data }: HeaderSectionProps) => {
  return (
    <div className={ styles['service-detail__header-section'] }>
      <div className={ styles['header-section__title'] }>
        <h1 className={ styles['title__emphasized-part__text'] }>
          { data.title_emphasized_part }
        </h1>
        <h2 className={ styles['title__base-part__text'] }>
          { data.title_base_part }
        </h2>
      </div>
      <div className={ styles["header-section__subtitle"] }>
          <h3 className={ styles["subtitle__text"] }>
            { data.sub_title }
          </h3>
      </div>
    </div>
  )
};

export default HeaderSectionComponent;


// export const HeaderSectionComponent = ({ data }: HeaderSectionProps) => {
//   return (
//     <div className="header-section">
//       <h1>
//         {data.title_emphasized_part && (
//           <span className="emphasized">{data.title_emphasized_part} </span>
//         )}
//         <span>{data.title_base_part}</span>
//       </h1>
//       {data.sub_title && <p className="subtitle">{data.sub_title}</p>}
//     </div>
//   );
// };