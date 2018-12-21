// import { ApolloLink } from 'apollo-link'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'

// export default () => {
//   const httpLink = new HttpLink({ uri: 'http://localhost:3001/v1/' })
//   // const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

//   // auth token
//   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNTQzNTcxNjg0LCJleHAiOjE1NDM1NzUyODQsImp0aSI6ImE3MzVjMTQ2LTc0MzctNDNkMS1hNWRkLTM1YTU1YjAwN2FjMCJ9.JLJEeNHahNnEmZZyI4KIWy2Cd404wnzEghGnCzY8x_I'

//   // middleware
//   const middlewareLink = new ApolloLink((operation, forward) => {
//     operation.setContext({
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     return forward(operation)
//   })
//   const link = middlewareLink.concat(httpLink)
//   return {
//     link,
//     cache: new InMemoryCache()
//   }
// }