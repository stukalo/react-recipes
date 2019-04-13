import React from 'react';
import './app.css';

import {Query} from 'react-apollo';
import {GET_ALL_RECIPES} from '../queries';

const App = () => (
    <div className='app'>
        <h1 className='app_title'>Home</h1>
        <Query query={GET_ALL_RECIPES}>
            {({data, loading, error}) => {
                if (loading) return <div>Loading</div>
                if (error) return <div>Error</div>
                console.log(data);
                return (
                    <p>Recipes</p>
                )
            }}
        </Query>
    </div>
);

export default App;
