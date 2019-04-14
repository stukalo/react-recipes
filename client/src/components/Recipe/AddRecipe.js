import React, { Component } from 'react';
import './addRecipe.css';
import Error from '../../components/Error';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import {ADD_RECIPE, GET_ALL_RECIPES} from "../../queries";

const initialState = {
    name: '',
    instructions: '',
    category: 'Breakfast',
    description: '',
    username: ''
};

class AddRecipe extends Component {
    state = { ...initialState };

    componentDidMount() {
        const { username } = this.props.session.getCurrentUser;

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
            this.clearState();
            this.props.history.push('/');
        });
    };

    clearState = () => {
        this.setState(() => ({ ...initialState }));
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

    updateCache = (cache, { data: { addRecipe } }) => {
        const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

        cache.writeQuery({
            query: GET_ALL_RECIPES,
            data: {
                getAllRecipes: [addRecipe, ...getAllRecipes]
            },
        })
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
                      update={this.updateCache}
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

export default withRouter(AddRecipe);