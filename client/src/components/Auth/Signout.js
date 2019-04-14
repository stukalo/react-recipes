import React from 'react';
import './signout.css';
import { withRouter } from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const handleSignout = (client, history) => {
    localStorage.setItem('token', '');
    client.resetStore();
    history.push('/');
};

const Signout = ({ history }) => (
    <ApolloConsumer>
        {client => {
            return (
                <div className='signout'>
                    <button
                        onClick={() => handleSignout(client, history)}
                        children='Signout'
                    />
                </div>
            );
        }}
    </ApolloConsumer>

);

export default withRouter(Signout);