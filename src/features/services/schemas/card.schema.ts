import { z } from "zod";
import { createStringField } from "../utils";
import { VALIDATION_CONFIG } from "../config/validation.config";


export const ServiceSlugSchema = z.enum([
 "corporate-services",
  "commercial-dispute",
  "bankruptcy"
]);

export type ServiceSlug = z.infer<typeof ServiceSlugSchema>;

export const CardSectionSchema = z.object({
  slug: ServiceSlugSchema,
  title: createStringField('title', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH
  }),
  subtitle: createStringField('title', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH
  }),
}).strict();

export type CardSection = z.infer<typeof CardSectionSchema>;


