import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { GET_USER_RECIPES } from '../../queries';

const UserRecipes = ({ username }) => (
    <Query query={GET_USER_RECIPES}
           variables={{ username }}
    >
        {
            ({ data, loading, error }) => {
                if (loading) return <div>Loading</div>;
                if (error) return <div>Error</div>;

                return (
                    <div>
                        <h3>Your Recipes</h3>
                        <ul>
                            {data.getUserRecipes.map(recipe => (
                                <li key={recipe._id}>
                                    <Link to={`/recipes/${recipe._id}`}>
                                        <p>{recipe.name}</p>
                                    </Link>
                                    <p>Likes: {recipe.likes}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
        }
    </Query>
);

export default UserRecipes;