import { ClientAddress, Client } from "@/domain/entities";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ClientEntity } from "@/infra/entities";

@Entity("clients_addresses")
export class ClientAddressEntity implements ClientAddress {
  @PrimaryColumn()
  id: number;

  @Column({ name: "street_address" })
  streetAddress: string;

  @Column()
  district: string;

  @Column({ name: "zip_code" })
  zipCode: string;

  @Column()
  state: string;

  @Column({ name: 'federal_unit' })
  federalUnit: string;

  @Column()
  city: string;

  @ManyToOne(() => ClientEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id", name: "client_id" })
  client: Client;
}
