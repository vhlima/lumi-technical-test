import { ListClientsService } from "@/data/services";
import { ClientsRepository } from "@/infra/repositories";

export function getListClientsService(): ListClientsService {
  const service = new ListClientsService(new ClientsRepository());
  return service;
}
