import { 
  describe,
  it,
  expect,
} from "vitest";
import { z } from "zod";
import { createStringField } from "../../../features/services/utils";


describe('createStringField', () => {
  describe('basic behavior', () => {
    it('create a string schema without validation', () => {
      const schema = createStringField('testField');

      expect(schema).toBeInstanceOf(z.ZodString);
      expect(schema.safeParse('test').success).toBe(true);
      expect(schema.safeParse('').success).toBe(true);
      expect(schema.safeParse(123).success).toBe(false);
    })
  })

  describe('check behavior while feld is required', () => {
    it('validates required field', () => {
      const schema = createStringField('username', { required: true });

      expect(schema.safeParse('John').success).toBe(true);
      expect(schema.safeParse('a').success).toBe(true);

      const emptyField = schema.safeParse('');
      expect(emptyField.success).toBe(false);
      
      if (!emptyField.success) {
        expect(emptyField.error.issues[0].message).toBe(
          "Field 'username' is required and cannot be empty"
        );
        
        expect(emptyField.error.issues[0]).toMatchObject({
          code: 'custom',
          path: [],
          params: {
            errorCode: 'REQUIRED_FIELD',
            severity: 'error',
            field: 'username'
          }
        });
      }
      else {
        expect.fail('Expected validation to fail');
      }
    })
  })
})



