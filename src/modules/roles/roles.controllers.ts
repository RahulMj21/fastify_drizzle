import RolesServices from "@/roles/roles.services";
import { STATUS_CODE, STATUS_TEXT } from "@/utils/constants";
import { FastifyReply, FastifyRequest } from "fastify";
import { TCreateRoleInput } from "@/roles/roles.schemas";

class RolesControllers {
  service: RolesServices;

  constructor() {
    this.service = new RolesServices();
  }

  createRole = async (
    request: FastifyRequest<{ Body: TCreateRoleInput }>,
    reply: FastifyReply,
  ) => {
    try {
      const { name, permissions, applicationId } = request.body;

      const result = await this.service.createRole({
        name,
        permissions,
        applicationId,
      });
      if (!result) {
        return reply.code(STATUS_CODE.BAD_REQUEST).serialize({
          status: STATUS_TEXT.ERROR,
          message: "failed to create new role",
        });
      }

      return reply
        .code(STATUS_CODE.OK)
        .serialize({ status: STATUS_TEXT.OK, data: result });
    } catch (error) {
      return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
        status: STATUS_TEXT.ERROR,
        message: "something went wrong",
      });
    }
  };
}

export default RolesControllers;
