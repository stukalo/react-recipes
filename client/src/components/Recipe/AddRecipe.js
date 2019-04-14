import React, { Component } from 'react';
import './addRecipe.css';
import Error from '../../components/Error';

import { Mutation } from 'react-apollo';
import {ADD_RECIPE} from "../../queries";

class AddRecipe extends Component {
    state = {
        name: '',
        instructions: '',
        category: 'Breakfast',
        description: '',
        username: ''
    };

    componentDidMount() {
        const { username } = this.props.session;

        this.setState(() => ({
            username,
        }));
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState(() => ({
            [name]: value,
        }));
    };

    handleSubmit = (event, addRecipe) => {
        event.preventDefault();

        addRecipe().then(({ data }) => {
            console.log(data);
        });
    };

    validateForm = () => {
        const {
            name,
            category,
            description,
            instructions,
        } = this.state;

        const isInvalid = !name || !category || !description || !instructions;

        return isInvalid;
    };

    render() {
        const {
            name,
            category,
            description,
            instructions,
            username,
        } = this.state;

        return (
            <Mutation mutation={ADD_RECIPE}
                      variables={{
                          name,
                          category,
                          description,
                          instructions,
                          username,
                      }}
            >
                {( addRecipe, { data, loading, error }) => {
                    return (
                        <div className='add-recipe'>
                            <h2 className='add-recipe_title'>
                                Add Recipe
                            </h2>
                            <form className='add-recipe_form'
                                  onSubmit={event => this.handleSubmit(event, addRecipe)}
                            >
                                <input type='text'
                                       name='name'
                                       value={name}
                                       onChange={this.handleChange}
                                       placeholder='Recipe name'
                                />
                                <select name='category'
                                        value={category}
                                        onChange={this.handleChange}
                                >
                                    <option value='Breakfast'>Breakfast</option>
                                    <option value='Lunch'>Lunch</option>
                                    <option value='Dinner'>Dinner</option>
                                    <option value='Snack'>Snack</option>
                                </select>
                                <input type='text'
                                       name='description'
                                       value={description}
                                       onChange={this.handleChange}
                                       placeholder='Add description'
                                />
                                <textarea name='instructions'
                                          value={instructions}
                                          onChange={this.handleChange}
                                          placeholder='Add instructions'
                                />
                                <button type='submit'
                                        disabled={loading || this.validateForm()}
                                >
                                    Submit
                                </button>
                                {error && <Error error={error}/>}
                            </form>
                        </div>
                    );
                }}
            </Mutation>
        );
    }
}

export default AddRecipe;