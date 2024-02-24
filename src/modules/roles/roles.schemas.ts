import { ALL_PERMISSIONS } from "@/config/permissions";
import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

export const createRoleInputSchema = z.object({
  name: z.string(),
  applicationId: z.string(),
  permissions: z.array(z.enum(ALL_PERMISSIONS)),
});

export type TCreateRoleInput = z.infer<typeof createRoleInputSchema>;

export const createRoleInputJSONSchema = {
  body: zodToJsonSchema(createRoleInputSchema, "createRoleInputSchema"),
};
