export type ServiceSlug = 
  | "corporate-services"    
  | "commercial-dispute"
  | "bankruptcy";

export const SLUG_TO_JSON_KEY = {
  "corporate-services": "corporate_services",
  "commercial-dispute": "commercial_disputes",
  "bankruptcy": "bankruptcy"
} as const;

