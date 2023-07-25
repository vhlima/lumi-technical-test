import { ListLatestInvoicesService } from "@/data/services";
import { InvoicesRepository } from "@/infra/repositories";

export function getListLatestInvoicesService(): ListLatestInvoicesService {
  const service = new ListLatestInvoicesService(new InvoicesRepository());
  return service;
}
