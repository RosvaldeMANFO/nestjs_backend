import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import TaskStatus from './TaskStatus';
import User from './User.entity';

@Entity("tasks")
export default class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 70 })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({
    nullable: false,
    default: TaskStatus.PENDING,
  })
  status: string;

  @Column({ type: "integer" })
  createdAt: Date = new Date();

  @Column({ type: "integer" })
  updatedAt: Date = new Date();

  @ManyToOne(() => User, (user) => user.tasks, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;
}