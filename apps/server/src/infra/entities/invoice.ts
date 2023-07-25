import { Invoice, InvoiceExpense } from "@/domain/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceExpenseEntity } from "./invoice-expense";

@Entity('invoices')
export class InvoiceEntity implements Invoice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @Column({ name: 'installation_number' })
  installationNumber: number;

  get price() {
    return this.expenses.reduce((acc, current) => acc += current.price, 0);
  }

  @OneToMany(() => InvoiceExpenseEntity, expense => expense.invoice)
  expenses: InvoiceExpense[];

  @Column({ name: 'relative_to' })
  relativeTo: Date;

  @Column({ name: 'expires_at' })
  expiresAt: Date;
}
