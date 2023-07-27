import { Client, ClientAddress } from "@/domain/entities";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ClientAddressEntity } from "@/infra/entities";

@Entity("clients")
export class ClientEntity implements Client {
  @PrimaryColumn()
  id: number;

  @Column({ name: "full_name" })
  fullName: string;

  @OneToMany(() => ClientAddressEntity, (expense) => expense.client)
  addresses: ClientAddress[];
}
