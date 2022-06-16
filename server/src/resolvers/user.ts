import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "src/entities/User";


@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

// Saves User to the database
@Resolver()
export class UserResolver {
    @Mutation(() => String)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em}: MyContext
    ) {
        const user = em.create(User, { username: options.username });
        await em.persistAndFlush(user);
        return "Good Bye World"
    }
}

