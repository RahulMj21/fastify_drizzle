import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createApplicationInputSchema = z.object({
  name: z
    .string({ required_error: "Name is Required" })
    .min(2, "Name must contain atleast 2 characters"),
});

export type TCreateApplicationInput = z.infer<
  typeof createApplicationInputSchema
>;

export const createApplicationJSONSchema = {
  body: zodToJsonSchema(
    createApplicationInputSchema,
    "createApplicationInputSchema",
  ),
};
