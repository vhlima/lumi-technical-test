import { Client } from "@/domain/entities";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("clients")
export class ClientEntity implements Client {
  @PrimaryColumn()
  id: number;

  @Column({ name: "full_name" })
  fullName: string;
}
