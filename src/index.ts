import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config"
import express from 'express'

const main = async () => {
    
    const orm = await MikroORM.init(microConfig); // connect to database
    await orm.getMigrator().up(); // auto run migrations


    const app = express();

    app.get('/', (_req, res) => {
        res.send('Hello')
    })


    app.listen(4000, () => {
        console.log('Server stated on localhost: 4000')
    })
};


main().catch((err) => {
    console.log(err)
});




console.log("Hello World!")