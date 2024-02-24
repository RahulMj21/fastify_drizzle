import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createUserInputSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must contain atleast 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must contain atleast 8 characters"),
  applicationId: z.string(),
});

export type TCreateUserInput = z.infer<typeof createUserInputSchema>;

export const createUserInputJSONSchema = {
  body: zodToJsonSchema(createUserInputSchema, "createUserInputSchema"),
};
