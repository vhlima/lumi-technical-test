import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientsAddresses1690423112174 implements MigrationInterface {
  private tableName = "clients_addresses";

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
            name: "street_address",
            type: "varchar",
          },
          {
            name: "district",
            type: "varchar",
          },
          {
            name: "zip_code",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "federal_unit",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
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
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
