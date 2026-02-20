import {
  describe,
  it,
  expect
} from "vitest";
// import { z } from "zod";
import { CardSectionSchema } from "../../../features/services/types";


const object_test = {
  "slug": "corporate-services",
  "title": "Корпоративные процедуры и разрешение конфликтов",
  "subtitle": "Выстраиваем отношения между участниками и инвесторами, разрабатываем корпоративные документы, сопровождаем сделки, ведём переговоры и защищаем интересы в судах."
};

describe("CardSectionSchema: zod-validation", () => {
  describe("basic behavior", () => {
    it('Validation schema operation and post‑validation data access test', () => {
      const validated = CardSectionSchema.safeParse(object_test);

      // console.log(validated);
      // console.log(SLUG_TO_JSON_KEY);

      expect(validated.data).toMatchObject(object_test);
    })
  })
});