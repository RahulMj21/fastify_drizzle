import { db } from "@/database";
import { applications, roles, users, usersToRoles } from "@/database/schema";
import { generatePassword } from "@/utils";
import { InferInsertModel, and, eq } from "drizzle-orm";

class UsersServices {
  createUser = async (payload: InferInsertModel<typeof users>) => {
    try {
      const hashedPassword = await generatePassword(payload.password);
      const inputs = { ...payload, password: hashedPassword };

      const result = await db.insert(users).values(inputs).returning({
        name: users.name,
        email: users.email,
        id: users.id,
        applicationId: users.applicationId,
        createdAt: users.createdAt,
      });

      return result[0];
    } catch (error) {
      return false;
    }
  };

  findUsersByApplicationId = async (applicationId: string) => {
    try {
      const result = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.applicationId, applicationId));

      return result;
    } catch (error) {
      return false;
    }
  };

  checkApplicationHasUsers = async (applicationId: string) => {
    try {
      const result = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.applicationId, applicationId))
        .limit(1);

      return result[0];
    } catch (error) {
      return false;
    }
  };

  assignRoleToUser = async (payload: InferInsertModel<typeof usersToRoles>) => {
    try {
      const result = await db.insert(usersToRoles).values(payload).returning();

      return result[0];
    } catch (error) {
      return false;
    }
  };

  findUserByEmail = async ({
    email,
    applicationId,
  }: {
    email: string;
    applicationId: string;
  }) => {
    try {
      const result = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          password: users.password,
          applicationId: users.applicationId,
          createdAt: users.createdAt,
          permissions: roles.permissions,
        })
        .from(users)
        .where(
          and(eq(users.applicationId, applicationId), eq(users.email, email)),
        )
        .leftJoin(
          usersToRoles,
          and(
            eq(usersToRoles.userId, users.id),
            eq(usersToRoles.applicationId, users.applicationId),
          ),
        )
        .leftJoin(roles, eq(roles.id, usersToRoles.roleId));

      return result[0];
    } catch (error) {
      return false;
    }
  };
}

export default UsersServices;
