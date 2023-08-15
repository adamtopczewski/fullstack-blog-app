import { Exclude } from 'class-transformer';
import Post from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  lastName?: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];
}

export default User;
