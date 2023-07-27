import { FindClientService } from "@/data/services";
import { ClientsRepository } from "@/infra/repositories";

export function getFindClientService(): FindClientService {
  const service = new FindClientService(new ClientsRepository());
  return service;
}
