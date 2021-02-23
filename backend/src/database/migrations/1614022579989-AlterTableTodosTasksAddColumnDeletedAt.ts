import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableTodosTasksAddColumnDeletedAt1614022579989
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "todos_tasks",
      new TableColumn({
        name: "deleted_at",
        type: "timestamp with time zone",
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("todos_tasks", "deleted_at");
  }
}
