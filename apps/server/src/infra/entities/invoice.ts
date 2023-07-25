import { Invoice, InvoiceExpense } from "@/domain/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceExpenseEntity } from "./invoice-expense";

@Entity('invoices')
export class InvoiceEntity implements Invoice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ name: 'installation_number' })
  installationNumber: number;

  price: number;

  @OneToMany(() => InvoiceExpenseEntity, expense => expense.invoice)
  expenses: InvoiceExpense[];

  @Column({ name: 'relative_to' })
  relativeTo: Date;

  @Column({ name: 'expires_at' })
  expiresAt: Date;
}
