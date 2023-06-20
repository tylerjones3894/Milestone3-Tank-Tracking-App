const express = require('express');
import cors from "cors";
const bodyParser = require('body-parser');
//exports a middleware function that funnels requests to the proper resolver
const graphqlHttp = require('express-graphql');
//destructured to pull specific properties from graphql
//buildSchema takes a string that defines schema
const { buildSchema } = require('graphql');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//graphql has 1 endpoint for all request
//second arg is middleware function passing object to configure API
app.use('/api', graphqlHttp({
    // schema object contains root comands
    // types define what an endpoint returns, bundles all supported queries and mutations
    // the ! assures a string will always be returned and can't be nulled. can return an empty list
    schema: buildSchema(`
        type RootQuery {
            tasks: [String!]
        }
        type RootMutation {
            createTask(name: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    //directs to another object containing all resolver functions
    //a resolver is a function within the object
    rootValue: {
        tasks: () => {
            return []
        },
        //args to access args passed in RootMutation
        createTask: (arg) => {
            const taskName = arg.name;
            return taskName;
        }
    },
    //creates user interface to test api
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});