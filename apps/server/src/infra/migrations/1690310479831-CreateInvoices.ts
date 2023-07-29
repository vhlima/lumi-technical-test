import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoices1690310475397 implements MigrationInterface {
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
            generationStrategy: "increment",
          },
          {
            name: "client_id",
            type: "bigint",
          },
          {
            name: "address_id",
            type: "int",
          },
          {
            name: "price",
            type: "double precision",
          },
          {
            name: "relative_year",
            type: "int",
          },
          {
            name: "relative_month",
            type: "int",
          },
          {
            name: "expires_at",
            type: "timestamptz",
          },
        ],
        foreignKeys: [
          {
            name: "FKClient",
            referencedTableName: "clients",
            referencedColumnNames: ["id"],
            columnNames: ["client_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          {
            name: "FKAddress",
            referencedTableName: "clients_addresses",
            referencedColumnNames: ["id"],
            columnNames: ["address_id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
