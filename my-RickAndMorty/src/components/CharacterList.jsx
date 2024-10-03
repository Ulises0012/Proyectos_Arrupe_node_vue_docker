
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({
        species: '',
        status: '',
        gender: '',
        origin: '',
    });

    useEffect(() => {
        fetchCharacters();
    }, [currentPage, filters]);

    const fetchCharacters = async () => {
        try {
            const query = new URLSearchParams({
                page: currentPage,
                ...filters,
            }).toString();
            const response = await axios.get(`https://rickandmortyapi.com/api/character?${query}`);
            const results = response.data.results;

            setCharacters(results);
            setTotalPages(response.data.info.pages);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <h1>Character List</h1>
            <div>
                <label>
                    Species:
                    <input type="text" name="species" value={filters.species} onChange={handleFilterChange} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={filters.status} onChange={handleFilterChange} />
                </label>
                <label>
                    Gender:
                    <input type="text" name="gender" value={filters.gender} onChange={handleFilterChange} />
                </label>
                <label>
                    Origin:
                    <input type="text" name="origin" value={filters.origin} onChange={handleFilterChange} />
                </label>
            </div>
            <div className="character-list">
                {characters.map((character) => (
                    <div key={character.id} className="character-card">
                        <Link to={`/character/${character.id}`}>
                            <img className="character-image" src={character.image} alt={character.name} />
                            <div className="character-name">{character.name}</div>
                            <div className="character-species">{character.species}</div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default CharacterList;
