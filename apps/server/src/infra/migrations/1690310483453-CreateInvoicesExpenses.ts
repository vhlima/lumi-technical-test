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
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "price",
            type: "double precision",
          },
          {
            name: "invoice_id",
            type: "int",
          },
          {
            name: "quantity",
            type: "int",
            isNullable: true,
          },
          {
            name: "unitary_price",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "unitary_tax_price",
            type: "double precision",
            isNullable: true,
          },
          {
            name: "measurement_unit",
            type: "varchar",
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKInvoice',
            referencedTableName: 'invoices',
            referencedColumnNames: ['id'],
            columnNames: ['invoice_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
