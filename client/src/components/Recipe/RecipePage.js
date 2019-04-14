import React from 'react';
import './recipePage.css';
import { withRouter } from 'react-router-dom';

import { Query } from 'react-apollo';
import { GET_RECIPE } from "../../queries";

const RecipePage = ({ match }) => {
    const { _id } = match.params; //get param from location

    return (
        <Query query={GET_RECIPE} variables={{ _id }}>
            {({ data, loading, error }) => {
                if(loading) return <div>Loading</div>
                if(error) return <div>Error</div>

                console.log(data);

                return (
                    <div className='recipe-page'>
                        <h2 className='recipe-page_title'>
                            {data.getRecipe.name}
                        </h2>
                        <p>Category: {data.getRecipe.category}</p>
                        <p>Description: {data.getRecipe.description}</p>
                        <p>Instructions: {data.getRecipe.instructions}</p>
                        <p>Likes: {data.getRecipe.likes}</p>
                        <p>Created by: {data.getRecipe.username}</p>
                        <button>Like</button>
                    </div>
                );
            }}
        </Query>
    )
};

export default withRouter(RecipePage);