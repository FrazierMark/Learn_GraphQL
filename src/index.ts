import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"
import express from 'express'
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
    
    const orm = await MikroORM.init(microConfig); // connect to database
    await orm.getMigrator().up(); // auto run migrations

    const app = express();

    // Setting up graphQL endpoint, resolvers= schema
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false,

        })
    });

    await apolloServer.start();

    
    apolloServer.applyMiddleware({app})

    app.listen(4000, () => {
        console.log('Server stated on localhost: 4000')
    })
};


main().catch((err) => {
    console.log(err)
});




console.log("Hello World!")