const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Import Apollo Server
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  // Import typeDefs and resolvers


  // Create an instance of Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });


  // Apply Apollo Server as middleware to Express server
  server.applyMiddleware({ app });
}



db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});


startApolloServer();