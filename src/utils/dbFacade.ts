import { PrismaConector } from "../services/prisma_client";

class DbFacade {
  private static instance: DbFacade;
  public static USERTABLE = "users";
  private constructor() {}
  private static getInstance(): DbFacade {
    if (!DbFacade.instance) {
      DbFacade.instance = new DbFacade();
    }
    return new DbFacade();
  }
}
export default DbFacade;
