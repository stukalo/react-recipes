import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import Error from '../Error';
import './signup.css';
import { SIGNUP_USER } from "../../queries";

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
};

class Signup extends Component {
    state = { ...initialState };

    clearState = () => {
        this.setState(() => ({...initialState}));
    };

    validateForm = () => {
        const {
            username,
            email,
            password,
            passwordConfirmation,
        } = this.state;

        return !username || !email || !password || password !== passwordConfirmation;
    };


    handleChange = event => {
        const { name, value } = event.target;
        this.setState(state => ({
            [name]: value,
        }));
    };

    handleSubmit = (event, signupUser) => {
        event.preventDefault();

        signupUser().then(async ({ data }) => {
            console.log(data);
            localStorage.setItem('token', data.signupUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    };

    render() {
        const {
            username,
            email,
            password,
            passwordConfirmation,
        } = this.state;

        return (
            <div className='signup'>
                <h2 className='signup_title'>Signup</h2>
                <Mutation mutation={SIGNUP_USER}
                          variables={{
                              username,
                              email,
                              password,
                          }}
                >
                    {(signupUser, { data, loading, error }) => {
                        return (
                            <form className='signup_form'
                                  onSubmit={event => this.handleSubmit(event, signupUser)}
                            >
                                <input type='text'
                                       name='username'
                                       value={username}
                                       onChange={this.handleChange}
                                       placeholder='Username'
                                />
                                <input type='email'
                                       name='email'
                                       value={email}
                                       onChange={this.handleChange}
                                       placeholder='Email Address'
                                />
                                <input type='password'
                                       name='password'
                                       value={password}
                                       onChange={this.handleChange}
                                       placeholder='Password'
                                />
                                <input type='password'
                                       name='passwordConfirmation'
                                       value={passwordConfirmation}
                                       onChange={this.handleChange}
                                       placeholder='Confirm Password'
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

export default withRouter(Signup);