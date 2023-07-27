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
    const { clientId, addressId, ...invoiceData } = data;

    const invoice = this.ormRepository.create({
      client: {
        id: clientId,
      },
      address: {
        id: addressId,
      },
      ...invoiceData,
    });
    await this.ormRepository.save(invoice);
    return invoice;
  }

  public async findLatest(
    clientId: number,
    latest: number
  ): Promise<Invoice[]> {
    const latestInvoices = await this.ormRepository.find({
      where: {
        client: {
          id: clientId,
        },
      },
      order: {
        relativeTo: "DESC",
      },
      relations: ["expenses"],
      take: latest,
    });
    return latestInvoices.map((invoice) => ({
      ...invoice,
      energySpent: invoice.energySpent,
      price: invoice.price,
    }));
  }

  public async list(clientId: number): Promise<Invoice[]> {
    const invoices = await this.ormRepository.find({
      where: {
        client: {
          id: clientId,
        },
      },
      order: {
        relativeTo: "DESC",
      },
      relations: ["expenses"],
    });

    return invoices.map((invoice) => ({
      ...invoice,
      energySpent: invoice.energySpent,
      price: invoice.price,
    }));
  }

  public async findByDate(
    clientId: number,
    date: Date
  ): Promise<Invoice | null> {
    const invoice = await this.ormRepository.findOne({
      where: {
        client: {
          id: clientId,
        },
        relativeTo: date,
      },
    });

    return invoice;
  }
}
