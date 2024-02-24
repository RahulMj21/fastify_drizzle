import UsersServices from "@/users/users.services";
import { FastifyReply, FastifyRequest } from "fastify";
import { TCreateUserInput, TLoginInput } from "@/users/users.schemas";
import { STATUS_CODE, STATUS_TEXT } from "@/utils/constants";
import { SYSTEM_ROLES } from "@/config/permissions";
import RolesServices from "@/roles/roles.services";
import { createToken, verifyPassword } from "@/utils";

class UsersControllers {
  private service: UsersServices;
  private rolesService: RolesServices;

  constructor() {
    this.service = new UsersServices();
    this.rolesService = new RolesServices();
  }

  register = async (
    request: FastifyRequest<{ Body: TCreateUserInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const body = request.body;

      // First check if any user exists
      const isUserExists = await this.service.checkApplicationHasUsers(
        body.applicationId,
      );

      const roleToBeAssigned = isUserExists
        ? SYSTEM_ROLES.APPLICATION_USER
        : SYSTEM_ROLES.SUPER_ADMIN;

      const user = await this.service.createUser(body);
      if (!user) {
        return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
          status: STATUS_TEXT.ERROR,
          message: "something went wrong",
        });
      }

      // check if the role exists in the DB
      const role = await this.rolesService.findRoleByName({
        name: roleToBeAssigned,
        applicationId: body.applicationId,
      });
      if (!role) {
        return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
          status: STATUS_TEXT.ERROR,
          message: "something went wrong",
        });
      }

      // assign RoleToUser
      const roleToUser = await this.service.assignRoleToUser({
        applicationId: body.applicationId,
        userId: user.id,
        roleId: role.id,
      });
      if (!roleToUser) {
        return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
          status: STATUS_TEXT.ERROR,
          message: "something went wrong",
        });
      }

      return reply.code(201).serialize({
        status: STATUS_CODE.CREATED,
        message: "registered successfully",
        data: user,
      });
    } catch (error) {
      return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
        status: STATUS_TEXT.ERROR,
        message: "something went wrong",
      });
    }
  };

  login = async (
    request: FastifyRequest<{
      Body: TLoginInput;
    }>,
    reply: FastifyReply,
  ) => {
    try {
      const { email, password, applicationId } = request.body;

      // first check if the user exists
      const user = await this.service.findUserByEmail({ email, applicationId });
      if (!user) {
        return reply.code(STATUS_CODE.NOT_FOUND).serialize({
          status: STATUS_TEXT.ERROR,
          message: "wrong email or password",
        });
      }

      // validate the password
      const isPasswordVerified = await verifyPassword({
        hashedPassword: user.password,
        password,
      });
      if (!isPasswordVerified) {
        return reply.code(STATUS_CODE.NOT_FOUND).serialize({
          status: STATUS_TEXT.ERROR,
          message: "wrong email or password",
        });
      }

      // crateToken
      const token = createToken({ ...user, password: "**********" });

      // send response
      return reply.code(STATUS_CODE.OK).serialize({
        status: STATUS_TEXT.OK,
        message: "logged in successfully",
        data: token,
      });
    } catch (error) {
      return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
        status: STATUS_TEXT.ERROR,
        message: "something went wrong",
      });
    }
  };

  profile = async () => {};
}

export default UsersControllers;
