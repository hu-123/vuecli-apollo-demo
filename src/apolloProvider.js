import Vue from 'vue'
import VueApollo from 'vue-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {ApolloLink,concat,split} from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities'
import {InMemoryCache} from 'apollo-cache-inmemory'

const httpLink = new HttpLink({
    uri :'http://localhost:3020/graphql',
})

const apolloClient = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache(),
    connectToDevTools:true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient:apolloClient,
    errorCaptured(err){
        consloe.log(err);
    }
})
export default apolloProvider
