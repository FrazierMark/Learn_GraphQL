import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";


export default {
    migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files for typescript and javascript
    },
    entities: [Post, User], // creates db table for POSTs
    dbName: "rockit",
    user: "",
    password: "",
    type: "postgresql",
    debug: !__prod__,  // When not in production, debug is on.
} as Parameters<typeof MikroORM.init>[0]; //Parameters returns array, so we get first item