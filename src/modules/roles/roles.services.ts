import { db } from "@/database";
import { roles } from "@/database/schema";
import { InferInsertModel, eq, and } from "drizzle-orm";

class RolesServices {
  createRole = async (data: InferInsertModel<typeof roles>) => {
    try {
      const result = await db.insert(roles).values(data).returning();

      return result[0];
    } catch (error) {
      return false;
    }
  };

  findRoleByName = async (name: string, applicationId: string) => {
    try {
      const result = await db
        .select({ id: roles.id })
        .from(roles)
        .where(
          and(eq(roles.applicationId, applicationId), eq(roles.name, name)),
        );

      return result[0];
    } catch (error) {
      return false;
    }
  };
}

export default RolesServices;
