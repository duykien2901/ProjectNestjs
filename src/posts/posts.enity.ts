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

  @Column()
  views: number;

  @Column()
  content: string;

  @Column()
  mode_hide: number;

  @Column()
  owner_id: number;

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
