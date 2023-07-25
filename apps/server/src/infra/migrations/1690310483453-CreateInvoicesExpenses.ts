import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInvoicesExpenses1690310483453 implements MigrationInterface {
  private tableName = "invoices_expenses";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "price",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
            isNullable: true,
          },
          {
            name: "unitary_price",
            type: "int",
            isNullable: true,
          },
          {
            name: "unitary_tax_price",
            type: "int",
            isNullable: true,
          },
          {
            name: "measurement_unit",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
