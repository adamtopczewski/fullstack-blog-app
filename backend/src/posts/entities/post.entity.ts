import Category from 'src/categories/entities/category.entity';
import User from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  slug: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ nullable: true })
  content: string;

  @Column()
  summary: string;

  @Column({
    type: 'boolean',
  })
  published: boolean;

  @ManyToOne(() => User, (author: User) => author.posts)
  author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  categories: Category[];
}

export default Post;
