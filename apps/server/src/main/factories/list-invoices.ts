import { ListInvoicesService } from "@/data/services";
import { InvoicesRepository } from "@/infra/repositories";

export function getListInvoicesService(): ListInvoicesService {
  const service = new ListInvoicesService(new InvoicesRepository());
  return service;
}
