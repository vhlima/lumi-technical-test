import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoices1690310475194 implements MigrationInterface {
  private tableName = "invoices";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment"
          },
          {
            name: "client_id",
            type: "int",
          },
          {
            name: "installation_number",
            type: "int",
          },
          {
            name: "relative_to",
            type: "timestamp",
          },
          {
            name: "expires_at",
            type: "timestamp",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
