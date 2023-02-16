import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';

@Entity()
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    body: string;

/*    @OneToMany(() => Comment, (comments) => comments.post
        , {lazy: true})
    comments: Comment[];*/
}
