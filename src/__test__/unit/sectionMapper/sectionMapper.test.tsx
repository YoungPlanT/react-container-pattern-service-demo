import {
  describe,
  it,
  expect,
} from "vitest";
import { 
  mapJsonSectionToComponentType,
  mapJsonSections, 
} from "../../../services/utils";

describe("mapJsonSectionToComponentType", () => {
  describe("Checking the basic behavior of a function when only the section name is provided", () => {
    it("", () => {
      const jsonSection = "HeaderSection";
      const componentSection = mapJsonSectionToComponentType(jsonSection);

      expect(componentSection).toBe("header_section");
    })
  })

  it("", () => {
    const jsonSection = "HeaderSection";
    const componentSection = mapJsonSectionToComponentType(jsonSection);

    expect(componentSection).toBe("header_section");
  })
})

describe("mapJsonSections", () => {
  describe("", () => {
    it("", () => {
      const jsonSectionsSchema = [
        "HeaderSection",
        "CardSection",
        "BulletedListSection",
        "NumberedListSection",
        "ButtonSection"
      ];
      const componentsSchema = mapJsonSections(jsonSectionsSchema);

      console.log(componentsSchema);
    })
  })
})