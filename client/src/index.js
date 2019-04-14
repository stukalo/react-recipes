import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Search from './components/Recipe/Search';
import Profile from './components/Recipe/Profile';
import Navbar from './components/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import './index.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import withSession from './components/withSession';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import AddRecipe from "./components/Recipe/AddRecipe";
import RecipePage from "./components/Recipe/RecipePage";

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token,
            }
        })
    },
    onError: ({ networkError }) => {
        if(networkError) {
            console.log('Network Error', networkError);

            if(networkError.statusCode === 401) {
                localStorage.removeItem('token');
            }
        }
    }
});

const Root = ({ refetch, session }) => (
    <Router>
        <>
            <Navbar session={session}/>
            <Switch>
                <Route path='/' exact component={App}/>
                <Route path='/search' component={Search}/>
                <Route path='/search' component={Search}/>
                <Route path='/signin' render={() => <Signin refetch={refetch}/>}/>
                <Route path='/signup' render={() => <Signup refetch={refetch}/>}/>
                <Router path='/profile' component={Profile}/>
                <Route path='/recipe/add' render={() => <AddRecipe session={session}/>}/>
                <Route path='/recipes/:_id' component={RecipePage}/>
                <Redirect to='/'/>
            </Switch>
        </>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>
    , document.getElementById('root')
);
