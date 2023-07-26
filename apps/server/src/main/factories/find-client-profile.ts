import { FindClientProfileService } from "@/data/services";
import { InvoicesRepository } from "@/infra/repositories";

export function getFindClientProfileService(): FindClientProfileService {
  const service = new FindClientProfileService(new InvoicesRepository());
  return service;
}
