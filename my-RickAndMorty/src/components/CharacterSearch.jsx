// CharacterSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
            setResults(response.data.results);
        } catch (error) {
            console.error('Error searching characters:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a character"
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {results.map((character) => (
                    <div key={character.id}>
                        <Link to={`/character/${character.id}`}>
                            <img src={character.image} alt={character.name} />
                            <p>{character.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterSearch;
