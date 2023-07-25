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
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: "client_id",
            type: "bigint",
          },
          {
            name: "installation_number",
            type: "bigint",
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
