import { ClientAddress, Client } from "@/domain/entities";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientEntity } from "@/infra/entities";

@Entity("clients_addresses")
export class ClientAddressEntity implements ClientAddress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: "street_address" })
  streetAddress: string;

  @Column()
  district: string;

  @Column({ name: "zip_code" })
  zipCode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @ManyToOne(() => ClientEntity, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id", name: "client_id" })
  client: Client;
}
