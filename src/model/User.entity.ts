import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import Task from "./Task.entity";

@Entity("users")
export default class User {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: false, length: 70 })
  name: string;

  @Column({ nullable: false, length: 70 })
  email: string;

  @Column({ nullable: false, length: 70 })
  password: string;

  @Column({ type: "integer" })
  createdAt: Date = new Date();

  @Column({ type: "integer" })
  updatedAt: Date = new Date();

  @OneToMany(() => Task, (task) => task.user, { cascade: true, eager: true })
  tasks: Task[];
}