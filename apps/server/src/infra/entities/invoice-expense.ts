import { Invoice, InvoiceExpense } from "@/domain/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InvoiceEntity } from "./invoice";

@Entity('invoices_expenses')
export class InvoiceExpenseEntity implements InvoiceExpense {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  quantity?: number;

  @Column('double precision', { name: 'unitary_price', nullable: true })
  unitaryPrice?: number; 

  @Column('double precision', { name: 'unitary_tax_price', nullable: true })
  unitaryTaxPrice?: number;

  @Column({ name: 'measurement_unit', nullable: true })
  measurementUnit?: string;

  @ManyToOne(() => InvoiceEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'invoice_id' })
  invoice: Invoice;
}
