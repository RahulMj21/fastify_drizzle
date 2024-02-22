import ApplicationServices from "@/applications/applications.services";
import { TCreateApplicationInput } from "@/applications/applications.schemas";
import { FastifyReply, FastifyRequest } from "fastify";
import { STATUS_CODE, STATUS_TEXT } from "@/utils/constants";

class ApplicationsControllers {
  services: ApplicationServices;

  constructor() {
    this.services = new ApplicationServices();
  }

  createApplication = async (
    request: FastifyRequest<{ Body: TCreateApplicationInput }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;
    const application = await this.services.createApplication({ name });

    return reply
      .code(STATUS_CODE.CREATED)
      .serialize({ status: STATUS_TEXT.OK, data: application });
  };

  getApplications = async () => {};
}

export default ApplicationsControllers;
