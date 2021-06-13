//packages
import React from 'react'
import ReactDOM from 'react-dom'
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache, 
  split
} from '@apollo/client' 
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
//app and styles
import App from './App'
import './styles/index.css'

const httpLink = new HttpLink({
  uri: '/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/subscriptions`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
