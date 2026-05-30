import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn
} from 'typeorm';

@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column({ type: 'datetime', nullable: true })
  date_of_birth?: Date;

  @Column({ nullable: true })
  universe?: string;

  @Column({ nullable: true })
  main_power?: string;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}