import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTodosAddDeletedColumn1613589348762
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "todos",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp with time zone",
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("todos", "deleted_at");
  }
}
