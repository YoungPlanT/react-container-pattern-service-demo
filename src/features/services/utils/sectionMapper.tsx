import type React from "react";
import {
  HeaderSectionComponent,
  CardSectionComponent,
  BulletedListSectionComponent,
  NumberedListSectionComponent,
  ButtonSectionComponent 
} from "../components/sections";
import type {
  JsonSectionType,
  DataServiceContent
} from "../types/index";

// Type for data of each component
type SectionDataMap = {
  HeaderSection: import("../types").HeaderSection;
  CardSection: import("../types").CardSection;
  BulletedListSection: import("../types").BulletedListSection;
  NumberedListSection: import("../types").NumberedListSection;
  ButtonSection: import("../types").ButtonSection;
};

// Strict and type-safe type for the section component
type SectionComponent<T extends JsonSectionType> = React.ComponentType<{
  data: SectionDataMap[T];
}>;

// Component mapping with correct types
const componentMap: {
  [K in JsonSectionType]?: SectionComponent<K> | null
} = {
  HeaderSection: HeaderSectionComponent,
  CardSection: CardSectionComponent,
  BulletedListSection: BulletedListSectionComponent,
  NumberedListSection: NumberedListSectionComponent,
  ButtonSection: ButtonSectionComponent,
} as const;

const dataKeyMap: Record<JsonSectionType, keyof DataServiceContent> = {
  HeaderSection: 'header_section',
  CardSection: 'card_section',
  BulletedListSection: 'bulleted_list_section',
  NumberedListSection: 'numbered_list_section',
  ButtonSection: 'button_section',
};

interface SectionMapperProps {
  schema: JsonSectionType[];
  data: DataServiceContent;
};

const SectionMapper: React.FC<SectionMapperProps> = ({schema, data}) => {
  return (
    <>
      {schema.map((sectionType, index) => {
        const dataKey = dataKeyMap[sectionType];
        const sectionData = data[dataKey];

        const Component = componentMap[sectionType];

        if (!Component) {
          console.warn(`[SectionMapper] Component not implemented for: ${sectionType}`);
          return null;
        }

        if (!sectionData) {
          console.warn(`[SectionMapper] No data found for: ${sectionType}`);
          return null;
        }

        const TypedComponent = Component as React.ComponentType<{ data: typeof sectionData }>;
        
        return (
          <section 
            key={`${sectionType}-${index}`} 
            className={`section section--${sectionType.toLowerCase()}`}
          >
            <TypedComponent data={sectionData} />
          </section>
        );
      })}
    </>
  );
};

export default SectionMapper;