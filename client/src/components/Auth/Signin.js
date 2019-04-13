import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Error from '../Error';
import './signin.css';
import { SIGNIN_USER } from "../../queries";
import { withRouter } from 'react-router-dom';

const initialState = {
    username: '',
    password: '',
};

class Signin extends Component {
    state = { ...initialState };

    clearState = () => {
        this.setState(() => ({...initialState}));
    };

    validateForm = () => {
        const {
            username,
            password,
        } = this.state;

        return !username || !password;
    };


    handleChange = event => {
        const { name, value } = event.target;
        this.setState(() => ({
            [name]: value,
        }));
    };

    handleSubmit = (event, signinUser) => {
        event.preventDefault();

        signinUser().then(async ({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    };

    render() {
        const {
            username,
            password,
        } = this.state;

        return (
            <div className='signin'>
                <h2 className='signin_title'>Signin</h2>
                <Mutation mutation={SIGNIN_USER}
                          variables={{
                              username,
                              password,
                          }}
                >
                    {(signinUser, { data, loading, error }) => {
                        return (
                            <form className='signin_form'
                                  onSubmit={event => this.handleSubmit(event, signinUser)}
                            >
                                <input type='text'
                                       name='username'
                                       value={username}
                                       onChange={this.handleChange}
                                       placeholder='Username'
                                />
                                <input type='password'
                                       name='password'
                                       value={password}
                                       onChange={this.handleChange}
                                       placeholder='Password'
                                />
                                <button type='submit'
                                        children='Submit'
                                        className='button-primary'
                                        disabled={loading || this.validateForm() }
                                />
                                {error && <Error error={error}/>}
                            </form>
                        );
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signin);