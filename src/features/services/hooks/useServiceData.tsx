import { useCallback } from "react";
import ServiceSectionData from '../data/serviceSectionData.json';
import type {  
  ServiceSlug,
} from "../types";
import {
  CardSectionSchema,
} from "../types";


interface ServiceCardData {
  slug: ServiceSlug,
  title: string,
  subtitle: string,
};

export const useServiceData = () => {
  const getService = useCallback(():  ServiceCardData[] => {
    try {
      return Object.entries(ServiceSectionData).map(
        ([_, value]) => {
          const validated = CardSectionSchema.safeParse(value);

          if (!validated.success) {
            console.error('getService function | Invalid service data: ', value);
            return null;
          }

          return {
            slug: validated.data.slug,
            title: validated.data.title,
            subtitle: validated.data.subtitle,
          };
        }
      ).filter((item): item is ServiceCardData => item !== null);
    } catch (error) {
      console.error('getService function | Failed to load data from JSON file: ', error);
      return [];
    }
  }, []);

  return {
    getService
  };
};