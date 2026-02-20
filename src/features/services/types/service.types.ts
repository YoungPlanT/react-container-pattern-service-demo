import type { ServiceSlug } from '../schemas/card.schema';

export const SLUG_TO_JSON_KEY = {
  "corporate-services": "corporate_services",
  "commercial-dispute": "commercial_disputes",
  "bankruptcy": "bankruptcy"
} as const;

export type JsonKey = typeof SLUG_TO_JSON_KEY[ServiceSlug];

export type ProjectMode = 'develop' | 'product';

export interface LoadingState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
