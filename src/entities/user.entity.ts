import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Ideally called hashedPassword, but sticking with Github doc definition

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
