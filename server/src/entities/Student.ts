import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Specialization } from "./Specialization";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;

  @ManyToOne(() => Specialization, (specialization) => specialization.students)
  @JoinColumn({ name: "specializationId" })
  specialization!: Specialization;

  @Column()
  specializationId!: number; // Explicit foreign key column for specialization
}
