import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTodosTasks1614019526113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "todos_tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "todo_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "last_pulled_at",
            type: "timestamp with time zone",
            default: null,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["todo_id"],
            referencedTableName: "todos",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("todos_tasks");

    const fkTodoId = table?.foreignKeys.find(
      fk => fk.columnNames.indexOf("todo_id") !== -1,
    );

    // @ts-ignore
    await queryRunner.dropForeignKey("todos_tasks", fkTodoId);

    await queryRunner.dropTable("todos_tasks");
  }
}
