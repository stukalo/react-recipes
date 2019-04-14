import React from 'react';
import './search.css';
import SearchItem from './SearchItem';

import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from "../../queries";

class Search extends React.Component {
    state = {
        searchResults: []
    };

    handleChange = ({ searchRecipes }) => {
        this.setState(() => ({
            searchResults: searchRecipes
        }));
    };

    render() {
        const { searchResults } = this.state;

        return (
            <ApolloConsumer>
                {client => (
                    <div className='search'>
                        <input type='search'
                               placeholder='Search for Recipes'
                               onChange={async event => {
                                   event.persist();

                                   const { data } = await client.query({
                                       query: SEARCH_RECIPES,
                                       variables: { searchTerm: event.target.value }
                                   });
                                   this.handleChange(data);
                               }}
                        />
                        <ul>
                            {searchResults.map(recipe =>
                                <li key={recipe._id}>
                                    <SearchItem recipe={recipe}/>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}


export default Search;

