import { Invoice, InvoiceExpense } from "@/domain/entities";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  InvoiceExpenseEntity,
  ClientEntity,
  ClientAddressEntity,
} from "@/infra/entities";

@Entity("invoices")
export class InvoiceEntity implements Invoice {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => ClientEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id", name: "client_id" })
  client: ClientEntity;

  @ManyToOne(() => ClientAddressEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id", name: "address_id" })
  address: ClientAddressEntity;

  @Column({ type: "double precision", precision: 10, scale: 2, default: 0 })
  price: number;

  get energySpent() {
    return this.expenses
      .filter(
        (expense) =>
          expense.quantity &&
          expense.measurementUnit &&
          expense.measurementUnit === "kWh" &&
          expense.price >= 0
      )
      .reduce((acc, expense) => (acc += expense?.quantity || 0), 0);
  }

  @OneToMany(() => InvoiceExpenseEntity, (expense) => expense.invoice)
  expenses: InvoiceExpense[];

  @Column({ name: "relative_to" })
  relativeTo: Date;

  @Column({ name: "expires_at" })
  expiresAt: Date;
}
