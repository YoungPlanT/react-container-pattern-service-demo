import { useCallback } from 'react';
import ServiceDetail from '../data/serviceDetailData.json';
import type { ServiceSlug, Service  } from '../types/index';
import { SLUG_TO_JSON_KEY, ServiceSchema } from '../types/index';

export const useSectionData = () => {
  const getSection = useCallback((slug: ServiceSlug): Service | null => {
    try {
      const jsonKey = SLUG_TO_JSON_KEY[slug];
      const rawData = ServiceDetail[jsonKey];

      if (!rawData) {
        console.error('useSectionData function | No data found for: ', slug);
        return null;
      }

      const validated = ServiceSchema.safeParse(rawData);

      if (!validated.success) {
        console.error('useSectionData function | Validated failed: ', validated.error);
        return null;
      }

      return validated.data;
    } catch (error) {
      console.error('useSectionData function | Failed to load data from JSON file: ', error);
      return null;
    }
  }, []);

  return {
    getSection
  };
};