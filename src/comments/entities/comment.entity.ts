import {Column, Entity, JoinTable, ManyToOne, PrimaryColumn} from "typeorm";
import {Post} from "../../posts/entities/post.entity";

@Entity()
export class Comment {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    body: string;

    @ManyToOne(() => Post, (post) => post.comments, {lazy: true})
    @JoinTable({name: 'postId'})
    post: Post;
}
