// import type { JsonSectionType } from "../schemas/service.schema";
import type React from "react";
import {
  HeaderSectionComponent 
} from "../components/sections";
import type { Service } from "../types";
// import { useSectionData } from "../hooks";


const componentMap = {
  HeaderSection: HeaderSectionComponent,
  CardSection: null, // TODO: добавить
  BulletedListSection: null, // TODO: добавить
  NumberedListSection: null, // TODO: добавить
  ButtonSection: null, // TODO: добавить
} as const;

// TODO: Правки

// slug example: corporate_services

const SectionMapper: React.FC<Service> = ({ schema, data }) => {
  return (
    <>
      {schema.map((sectionType, index) => {
        const Component = componentMap[sectionType];
      })}
    </>
  )
};

export default SectionMapper;

// export const mapJsonSectionToComponentType = (jsonType: JsonSectionType): string => {
//   const map: Record<JsonSectionType, string> = {
//     "HeaderSection": "header_section",
//     "CardSection": "card_section",
//     "BulletedListSection": "bulleted_list_section",
//     "NumberedListSection": "numbered_list_section",
//     "ButtonSection": "button_section"
//   };
//   return map[jsonType];
// };

// export const mapJsonSections = (jsonTypes: JsonSectionType[]): string[] => 
//   jsonTypes.map(mapJsonSectionToComponentType);