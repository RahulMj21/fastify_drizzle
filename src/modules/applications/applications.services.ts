import { db } from "@/database";
import { applications } from "@/database/schema";
import { InferInsertModel } from "drizzle-orm";

class ApplicationServices {
  createApplication = async (
    payload: InferInsertModel<typeof applications>,
  ) => {
    try {
      const result = await db.insert(applications).values(payload).returning();
      return result[0];
    } catch (error) {
      return false;
    }
  };

  getApplications = async () => {
    try {
      const result = await db
        .select({
          id: applications.id,
          name: applications.name,
          createdAt: applications.createdAt,
        })
        .from(applications);

      return result;
    } catch (error) {
      return false;
    }
  };
}

export default ApplicationServices;
