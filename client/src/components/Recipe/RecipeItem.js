import React from 'react';
import { Link } from 'react-router-dom';


const RecipeItem = ({ _id, name, category }) => (
    <>
        <Link to={`/recipes/${_id}`}>
            <h4>{name}</h4>
        </Link>
        <p>
            <strong>{category}</strong>
        </p>
    </>
);

export default RecipeItem;
