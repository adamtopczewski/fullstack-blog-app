import { Exclude } from 'class-transformer';
import Post from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Role from '../role.enum';

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

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.Writer],
  })
  roles: Role[];
}

export default User;
