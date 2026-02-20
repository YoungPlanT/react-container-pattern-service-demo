export const VALIDATION_CONFIG = {
  stringValidation: {
    STRING_MIN_LENGTH: 1,
    STRING_MAX_LENGTH: 500,
  },
  arrayValidation: {
    ARRAY_MIN_LENGTH: 1,
    ARRAY_MAX_LENGTH: 10,
  },
} as const;

export default VALIDATION_CONFIG;