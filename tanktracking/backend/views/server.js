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
    schema: buildSchema(`
        schema {
            query:
            mutation:
        }
    `),
    //directs to another object containing all resolver functions
    rootValue: {}
}));

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});