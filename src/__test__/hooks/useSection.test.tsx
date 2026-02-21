import {
  describe,
  it,
  expect,
  beforeEach
} from "vitest";
import { useSectionData } from "../../features/services/hooks";
import { renderHook } from '@testing-library/react';

import type { ServiceSlug } from "../../features/services/types";
import { SLUG_TO_JSON_KEY, ServiceSchema } from "../../features/services/types";


describe("useSectionData", () => {
  let hookResult: { current: ReturnType<typeof useSectionData> };
  
  beforeEach(() => {
    const { result } = renderHook(() => useSectionData());
    hookResult = result;
  });

  // Get all available slugs from the mapping
  const slugs = Object.keys(SLUG_TO_JSON_KEY) as ServiceSlug[];

  describe("Data availability tests", () => {
    // Test that each slug returns non-null data
    it.each(slugs)("should return non-null data for slug: %s", (slug) => {
      const section = hookResult.current.getSection(slug);
      
      expect(section, `No data returned for ${slug}`).not.toBeNull();
      expect(section, `Data is undefined for ${slug}`).toBeDefined();
    });
  });

  describe("Schema validation tests", () => {
    // Validate that the returned data conforms to the Zod schema
    it.each(slugs)("should pass Zod schema validation for slug: %s", (slug) => {
      const section = hookResult.current.getSection(slug);
      
      if (!section) {
        throw new Error(`No data for ${slug}`);
      }

      const validationResult = ServiceSchema.safeParse(section);
      
      expect(
        validationResult.success,
        `Schema validation failed for ${slug}:\n${
          JSON.stringify(validationResult.error?.issues, null, 2)
        }`
      ).toBe(true);
    });
  });

  describe("Structural integrity tests", () => {
    // Verify that the schema types match the actual data structure
    it.each(slugs)("should have matching schema and data structure for slug: %s", (slug) => {
      const section = hookResult.current.getSection(slug);
      
      if (!section) return;

      const { service_content_schema, data_service_content } = section;

      // Map section types to their corresponding data keys
      const typeToKeyMap = {
        'HeaderSection': 'header_section',
        'CardSection': 'card_section',
        'BulletedListSection': 'bulleted_list_section',
        'NumberedListSection': 'numbered_list_section',
        'ButtonSection': 'button_section'
      };

      // Check that each declared section type has corresponding data
      service_content_schema.forEach(type => {
        const expectedKey = typeToKeyMap[type as keyof typeof typeToKeyMap];
        expect(
          data_service_content[expectedKey as keyof typeof data_service_content],
          `Missing data for ${type} (${expectedKey}) in ${slug}`
        ).toBeDefined();
      });
    });
  });

  describe("Edge cases", () => {
    // Test behavior with invalid slug
    it("should return null for non-existent slug", () => {
      // @ts-expect-error - testing invalid input
      const section = hookResult.current.getSection('non-existent-slug');
      expect(section).toBeNull();
    });

    // Ensure that all valid slugs can be processed without errors
    it("should handle all slugs without throwing errors", () => {
      slugs.forEach(slug => {
        expect(() => {
          hookResult.current.getSection(slug);
        }).not.toThrow();
      });
    });
  });

  describe("Business logic tests", () => {
    // Verify that each service has at least one section defined
    it("should have at least one section type for each service", () => {
      slugs.forEach(slug => {
        const section = hookResult.current.getSection(slug);
        
        if (section) {
          expect(
            section.service_content_schema.length,
            `Service ${slug} has no sections defined`
          ).toBeGreaterThan(0);
        }
      });
    });

    // Specific tests for bankruptcy service structure
    it("should have specific structure for bankruptcy service", () => {
      const slug = 'bankruptcy' as ServiceSlug;
      const section = hookResult.current.getSection(slug);
      
      if (!section) return;

      // Verify that bankruptcy service doesn't have a card section
      expect(
        section.data_service_content.card_section,
        "Bankruptcy should not have card_section"
      ).toBeUndefined();

      // Validate the structure of bulleted list data
      const bulletedData = section.data_service_content.bulleted_list_section?.bulleted_list_data;
      
      if (bulletedData) {
        Object.entries(bulletedData).forEach(([key, value]) => {
          // Keys must be numeric strings (as per schema)
          expect(key, `Invalid key format: ${key}`).toMatch(/^\d+$/);
          
          // Data field must not be empty
          expect(value.data, `Empty data for key ${key}`).toBeTruthy();
          expect(value.data.length, `Data too short for key ${key}`).toBeGreaterThan(10);
          
          // Image path must be either empty or start with '/'
          if (value.img_path) {
            expect(
              value.img_path === '' || value.img_path.startsWith('/'),
              `Invalid img_path: ${value.img_path}`
            ).toBe(true);
          }
        });
      }
    });
  });
});



// --------------------------------------------------------
// Helper functions and alternative test approach
// --------------------------------------------------------

// Helper to get a random slug from available keys
// const jsonKeys = Object.keys(SLUG_TO_JSON_KEY) as ServiceSlug[];
// const getrandomSlug = (): ServiceSlug => {
//   return jsonKeys[Math.floor(Math.random() * jsonKeys.length)];
// }

// Simple test to check data output format (commented out)
// describe("useSectionData", () => {
//   it("returns section data", () => {
//     const { result } = renderHook(() => useSectionData());

//     const randomSlug = getrandomSlug();
//     const section = result.current.getSection(randomSlug);

//     console.log(randomSlug);
//     console.log(section);
//   })
// })