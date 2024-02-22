import { db } from "@/database";
import { roles } from "@/database/schema";
import { InferInsertModel } from "drizzle-orm";

class RolesServices {
  createRole = async (data: InferInsertModel<typeof roles>) => {
    try {
      const result = await db.insert(roles).values(data).returning();

      return result[0];
    } catch (error) {
      return false;
    }
  };
}

export default RolesServices;
