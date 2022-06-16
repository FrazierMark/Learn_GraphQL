import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
// import { Post } from "./entities/Post";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

//Connecting to PostgreSQL db
const main = async () => {
    
    const orm = await MikroORM.init(microConfig); // Connects to db
    await orm.getMigrator().up();  // Runs Migrations when server restarts
    
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })  // Function that returns an object for the context
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({ app });
    
    app.listen(4000, () => {
        console.log("Server started on localhost:4000")
    });
};


main().catch((err) => {
    console.error(err);
});