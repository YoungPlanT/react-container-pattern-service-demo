import { z } from "zod";
import { createStringField } from "../utils";
import { VALIDATION_CONFIG } from "../config/validation.config";


// 1. HeaderSection
export const HeaderSectionSchema = z.object({
  type: z.literal('header_section').default('header_section'),
  title_emphasized_part: createStringField('title_base_part', {
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }).optional(),
  title_base_part: createStringField('title_base_part', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }),
  sub_title: createStringField('sub_title', {
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }).optional(),
}).strict();

export type HeaderSection = z.infer<typeof HeaderSectionSchema>;

// 2. CardSection
export const CardSectionSchema = z.object({
  type: z.literal('card_section').default('card_section'),
  title: createStringField('title', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }),
  cards_data: z.array(z.string())
    .superRefine((items, ctx) => {
      if (items.length < VALIDATION_CONFIG.arrayValidation.ARRAY_MIN_LENGTH) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          origin: 'array',
          message: "Array 'cards_data' must contain at least one item",
          params: {
            error: 'EMPTY_ARRAY',
            SEVERITY: 'error',
            field: 'cards_data',
          },
        });
        return;
      }

      if (items.length > VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH,
          type: 'string',
          origin: 'array',
          message: `Array 'cards_data' cannot contain more than ${VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH} items`,
          params: {
            error: 'ARRAY_TOO_LONG',
            severity: 'error',
            field: 'cards_data',
          }
        });
        return;
      }

      items.forEach((item, index) => {
        if (!item || item.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            type: 'string',
            path: ['cards_data', index],
            message: `Array element at index ${index} is empty or contains only whitespace`,
            params: {
              error: 'EMPTY_ARRAY_ELEMENT',
              severity: 'error',
            }
          });
        } 
      });
    })
}).strict();

export type CardSection = z.infer<typeof CardSectionSchema>;

// 3. BulletedListSection
export const BulletedListSectionSchema = z.object({
  type: z.literal('bulleted_list_section').default('bulleted_list_section'),
  title: createStringField('title', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }),

  bulleted_list_data: z.record(
    // Key validation
    z.string()
      .superRefine((key, ctx) => {
        // Check for empty smpty or whitespace-only string
        if (key.trim().length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Record key must not be empty",
            params: {
              errorCode: 'EMPTY_RECORD_KEY',
              severity: 'error',
            }
          });
          return;
        }

        // Maximum length required
        if (key.length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_big,
            maximum: 3,
            type: 'string',
            origin: 'string',
            message: 'Record key cannot exceed 3 characters',
            params: {
              errorCode: 'STRING_TOO_BIG',
              severity: 'error',
            }
          });
          return;
        }

        // Numeric format validation (digits only)
        if (!/^\d+$/.test(key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Record key must be a numeric string',
            params: {
              errorCode: 'KEY_NOT_NUMERIC',
              severity: 'error',
            }
          });
        }
      }),
    
    // Value object validation
    z.object({
      img_path: z.string()
        .default("")
        .refine(
          (path) => {
            if (path === '') return true;
            return path.startsWith('/') && !path.includes('\0');
          },
          {
            message: 'img_path must be empty or start with "/" (e.g., "/images/example.jpg")',
            params: {
              errorCode: 'INVALID_IMG_PATH',
              severity: 'error',
            }
          }
        ),
      
      data: z.string()
        .trim()
        .refine(
          (val) => val.length > VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
          {
            message: "Field 'data' cannot be empty",
            params: {
              errorCode: 'EMPTY_DATA_FIELD',
              severity: 'error',
            },
          }
        )
        .refine(
          (val) => val.length < VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
          {
            message: "Field 'data' exceeds maximum length",
            params: {
              errorCode: 'DATA_TOO_LONG',
              severity: 'error'
            },
          }
        )
    }).strict(),
  ),
}).strict();

export type BulletedListSection = z.infer<typeof BulletedListSectionSchema>;

// 4. NumberedListSection
export const NumberedListSectionSchema = z.object({
  type: z.literal('numbered_list_section').default('numbered_list_section'),
  title: createStringField('title', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH
  }),
  numbered_list_data: z.array(z.string())
    .refine(
      (arr) => arr.length > VALIDATION_CONFIG.arrayValidation.ARRAY_MIN_LENGTH,
      {
        message: "Array 'numbered_list_data' must contain at least one item",
        params: {
          errorCode: 'ARRAY_TOO_SMALL',
          min: VALIDATION_CONFIG.arrayValidation.ARRAY_MIN_LENGTH,
          severity: 'error',
        }
      }
    )
    .refine(
      (arr) => arr.length <= VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH,
      {
        message: `Array 'numbered_list_data' cannot contain more than ${VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH} items`,
        params: {
          errorCode: 'ARRY_TOO_BIG',
          max: VALIDATION_CONFIG.arrayValidation.ARRAY_MAX_LENGTH,
          severity: 'error',
        }
      }
    )
    .superRefine(
      (items, ctx) => {
        items.forEach((item, index) => {
          if (!item || item.trim().length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Array element at index ${index} is empty or contains only whitespace`,
              path: ["numbered_list_data", index],
              params: {
                errorCode: "EMPTY_ARRAY_LENGTH",
                severity: 'error',
              }
            })
          }
        })
      }
    ),
}).strict();

export type NumberedListSection = z.infer<typeof NumberedListSectionSchema>;

// 5. ButtonSection
export const ButtonSectionSchema = z.object({
  type: z.literal('button_section').default('button_section'),
  text_on_button: createStringField('text_on_button', {
    required: true,
    min: VALIDATION_CONFIG.stringValidation.STRING_MIN_LENGTH,
    max: VALIDATION_CONFIG.stringValidation.STRING_MAX_LENGTH,
  }),
}).strict();

export type ButtonSection = z.infer<typeof ButtonSectionSchema>;



// union all section type
export const SectionSchema = z.discriminatedUnion("type", [
  HeaderSectionSchema,
  CardSectionSchema,
  BulletedListSectionSchema,
  NumberedListSectionSchema,
  ButtonSectionSchema,
]);

export type Section = z.infer<typeof SectionSchema>;

// data content container
export const DataServiceContentSchema = z.object({
  header_section: HeaderSectionSchema.optional(),
  card_section: CardSectionSchema.optional(),
  bulleted_list_section: BulletedListSectionSchema.optional(),
  numbered_list_section: NumberedListSectionSchema.optional(),
  button_section: ButtonSectionSchema.optional(),
}).strict();

export type DataServiceContent = z.infer<typeof DataServiceContentSchema>;

// JSON types for service schema
export const JsonSectionTypeSchema = z.enum([
  "HeaderSection", 
  "CardSection", 
  "BulletedListSection", 
  "NumberedListSection", 
  "ButtonSection"
]);

export type JsonSectionType = z.infer<typeof JsonSectionTypeSchema>;

// Full service schema
export const ServiceSchema = z.object({
  service_content_schema: z.array(JsonSectionTypeSchema),
  data_service_content: DataServiceContentSchema,
});

export type Service = z.infer<typeof ServiceSchema>;

// Collection of service
export const ServiceJsonSchema = z.record(z.string(), ServiceSchema);
export type ServiceJson = z.infer<typeof ServiceJsonSchema>;