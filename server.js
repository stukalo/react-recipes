const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const Recipe = require('./models/Recipe');
const User = require('./models/User');

// GraphOL-Express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// Create schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

mongoose
    .connect(process.env.MONGO_URI, {autoIndex: false})
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

//Initialize application
const app = express();

const corsOprions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOprions));

// Set up JWT authentification middleware
app.use(async (req, res, next) => {
   const token = req.headers['authorization'];
   if (token !== 'null') {
       try {
           const currentUser = await jwt.verify(token, process.env.SECRET);

           req.currentUser = currentUser;
       } catch(err) {
           console.error(err);
       }
   }
   next();
});

// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

// Connect schemas with GraphQL
app.use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(({ currentUser }) => ({
        schema,
        context: {
            Recipe,
            User,
            currentUser,
        }
    })),
);

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
   console.log(`Server listening on PORT ${PORT}`)
});
