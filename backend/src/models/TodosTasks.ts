import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Todos from "./Todos";

@Entity("todos_tasks")
class TodosTasks {
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

  @ManyToOne(() => Todos, todo => todo.tasks, {})
  @JoinColumn({ name: "todo_id" })
  todo: Todos;
}

export default TodosTasks;
