import { CreateClientAddressService } from "@/data/services";
import { ClientsAddressesRepository } from "@/infra/repositories";

export function getCreateClientAddress(): CreateClientAddressService {
  const service = new CreateClientAddressService(
    new ClientsAddressesRepository()
  );
  return service;
}
