import { IInvoicesRepository } from "@/data/contracts";
import { Repository } from "typeorm";
import { InvoiceEntity } from "@/infra/entities";
import { PostgresDataSource } from "@/infra/data-sources";
import { Invoice } from "@/domain/entities";
import { CreateInvoiceData } from "@/domain/usecases";

export class InvoicesRepository implements IInvoicesRepository {
  private ormRepository: Repository<InvoiceEntity>;

  constructor() {
    this.ormRepository = PostgresDataSource.getRepository(InvoiceEntity);
  }

  public async create(data: CreateInvoiceData): Promise<Invoice> {
    const invoice = this.ormRepository.create(data);
    await this.ormRepository.save(invoice);
    return invoice;
  }

  public async findLatest(
    clientId: number,
    latest: number
  ): Promise<Invoice[]> {
    const latestInvoices = await this.ormRepository.find({
      where: {
        clientId,
      },
      order: {
        relativeTo: "DESC",
      },
      take: latest,
    });
    return latestInvoices;
  }
}
