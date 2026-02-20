import { z } from "zod"

export const createStringField = (
  fieldName: string,
  options?: {
    min?: number,
    max?: number,
    required?: boolean,
  }
) => {
  let schema = z.string();

  if (options?.required) {
    schema = schema.refine(
      (val) => val && val.trim().length > 0,
      {
        message: `Field '${fieldName}' is required and cannot be empty`,
        params: {
          errorCode: 'REQUIRED_FIELD',
          severity: 'error',
          field: fieldName,
        }
      }
    );
  }

  if (options?.min) {
    schema = schema.refine(
      (val) => !val || val.length >= options.min!,
      {
        message: `Field '${fieldName}' must be at least ${options.min} characters`,
        params: {
          errorCode: 'STRING_TOO_SHORT',
          severity: 'error',
          field: fieldName,
          minLength: options.min,
        }
      }
    );
  }

  if (options?.max) {
    schema = schema.refine(
      (val) => !val || val.length <= options.max!,
      {
        message: `Field '${fieldName}' cannot exceed ${options.max} characters`,
        params: {
          errorCode: 'STRING_TOO_LONG',
          severity: 'error',
          field: fieldName,
          maxLength: options.max,
        }
      }
    );
  }

  return schema;
};