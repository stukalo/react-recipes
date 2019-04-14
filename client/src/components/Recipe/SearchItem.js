import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ recipe }) => (
    <>
        <Link to={`/recipes/${recipe._id}`}>
            <h4>{recipe.name}</h4>
        </Link>
        <p>Likes: {recipe.likes}</p>
    </>
);

export default SearchItem;
