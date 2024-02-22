import ApplicationServices from "@/applications/applications.services";
import { TCreateApplicationInput } from "@/applications/applications.schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { STATUS_CODE, STATUS_TEXT } from "@/utils/constants";
import RolesServices from "@/roles/roles.services";
import {
  ALL_PERMISSIONS,
  APPLICATION_USER_PERMISSIONS,
  SYSTEM_ROLES,
} from "@/config/permissions";

class ApplicationsControllers {
  services: ApplicationServices;
  rolesServices: RolesServices;

  constructor() {
    this.services = new ApplicationServices();
    this.rolesServices = new RolesServices();
  }

  createApplication = async (
    request: FastifyRequest<{ Body: TCreateApplicationInput }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;

    const application = await this.services.createApplication({ name });
    if (!application) {
      return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
        status: STATUS_TEXT.ERROR,
        message: "something went wrong",
      });
    }

    const superAdminRolePromise = this.rolesServices.createRole({
      applicationId: application.id,
      name: SYSTEM_ROLES.SUPER_ADMIN,
      permissions: ALL_PERMISSIONS as unknown as Array<string>,
    });

    const applicationUserRolePromise = this.rolesServices.createRole({
      applicationId: application.id,
      name: SYSTEM_ROLES.APPLICATION_USER,
      permissions: APPLICATION_USER_PERMISSIONS,
    });

    const [superAdminRole, applicationUserRole] = await Promise.allSettled([
      superAdminRolePromise,
      applicationUserRolePromise,
    ]);
    if (
      superAdminRole.status === "rejected" ||
      applicationUserRole.status === "rejected"
    ) {
      return reply.code(STATUS_CODE.INTERNAL_ERROR).serialize({
        status: STATUS_TEXT.ERROR,
        message: "something went wrong",
      });
    }

    const data = {
      application,
      superAdminRole: superAdminRole.value,
      applicationUserRole: applicationUserRole.value,
    };

    return reply
      .code(STATUS_CODE.CREATED)
      .serialize({ status: STATUS_TEXT.OK, data });
  };

  getApplications = async () => {
    const applications = await this.services.getApplications();

    return { status: STATUS_TEXT.OK, data: applications };
  };
}

export default ApplicationsControllers;
