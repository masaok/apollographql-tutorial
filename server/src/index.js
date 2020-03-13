const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')

// https://www.apollographql.com/docs/tutorial/data-source/#add-data-sources-to-apollo-server
const { createStore } = require('./utils')

// https://www.apollographql.com/docs/tutorial/resolvers/#connecting-resolvers-to-apollo-server
const resolvers = require('./resolvers')

const LaunchAPI = require('./datasources/launch')
const UserAPI = require('./datasources/user')

const store = createStore()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  })
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
