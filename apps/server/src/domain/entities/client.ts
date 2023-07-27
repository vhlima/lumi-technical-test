import { ClientAddress } from "@/domain/entities";

export class Client {
  id: number;
  fullName: string;
  addresses: ClientAddress[];
}