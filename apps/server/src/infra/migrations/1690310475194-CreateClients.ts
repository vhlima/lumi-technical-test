import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClients1690310475194 implements MigrationInterface {
  private tableName = "clients";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: "id",
            type: "bigint",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
