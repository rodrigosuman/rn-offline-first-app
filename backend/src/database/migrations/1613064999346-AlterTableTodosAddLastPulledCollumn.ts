import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTodosAddLastPulledCollumn1613064999346
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "todos",
      new TableColumn({
        name: "last_pulled_at",
        type: "timestamp with time zone",
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("todos", "last_pulled_at");
  }
}
