import ApplicationServices from "@/modules/applications/applications.services";

class ApplicationsControllers {
  services: ApplicationServices;

  constructor() {
    this.services = new ApplicationServices();
  }

  createApplication = async () => {};

  getApplications = async () => {};
}

export default ApplicationsControllers;
