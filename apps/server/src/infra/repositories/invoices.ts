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

  public async list(addressId: number): Promise<Invoice[]> {
    const invoices = await this.ormRepository.find({
      where: {
        address: {
          id: addressId,
        },
      },
      order: {
        relativeYear: "DESC",
      },
      relations: ["expenses", "address"],
    });

    return invoices.map((invoice) => ({
      ...invoice,
      energySpent: invoice.energySpent,
    }));
  }

  public async findByDate(
    clientId: number,
    addressId: number,
    year: number,
    month: number,
  ): Promise<Invoice | null> {
    const invoice = await this.ormRepository.findOne({
      where: {
        client: {
          id: clientId,
        },
        address: {
          id: addressId,
        },
        relativeYear: year,
        relativeMonth: month,
      },
    });

    return invoice;
  }
}
