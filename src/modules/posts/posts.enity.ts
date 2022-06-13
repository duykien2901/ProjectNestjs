import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from '../user/user.entity';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: number;

  @Column()
  title: string;

  @Column()
  images: string;

  @Column({ default: () => 0 })
  views: number;

  @Column()
  content: string;

  @Column()
  mode_hide: number;

  @Column()
  ownerId: number;

  @Column()
  mentions: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Users, (owner) => owner.posts)
  owner: Users;
}
