import { Post } from "src/entities/Post";
import { Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "src/types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() {em}: MyContext): Promise<Post[]>
    {
        return em.find(Post, {})
    }
}