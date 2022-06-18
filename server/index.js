require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDb = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());
// Connect to database
connectDb();

const port = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.listen(port, () => console.log('Server started at port ' + port));
