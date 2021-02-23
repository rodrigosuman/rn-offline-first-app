import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import TodosTasks from "./TodosTasks";

@Entity("todos")
class Todos {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp with time zone" })
  public readonly createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp with time zone" })
  public readonly updatedAt: Date;

  @Column({ name: "last_pulled_at", type: "timestamp with time zone" })
  public lastPulledAt: Date;

  @Column({ name: "deleted_at", type: "timestamp with time zone" })
  public deletedAt: Date;

  @Column("varchar")
  public title: string;

  @Column("varchar")
  public observation: string;

  @Column("boolean")
  public checked: boolean;

  @OneToMany(() => TodosTasks, tasks => tasks.todo, {})
  tasks: Array<TodosTasks>;
}

export default Todos;
