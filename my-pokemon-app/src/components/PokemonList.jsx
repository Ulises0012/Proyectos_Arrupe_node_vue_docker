import React, { useState, useEffect } from "react";
import axios from 'axios';
import './PokemonList.css';

const PokemonList = () => {
    const [pokemon, setPokemon] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchPokemon();
    }, [currentPage]);

    const fetchPokemon = async (name = null) => {
        try {
            const response = await axios.get(
                name 
                ? `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
                : `https://pokeapi.co/api/v2/pokemon/${currentPage}`
            );
            const data = response.data;
            const detailedPokemon = {
                name: data.name,
                image: data.sprites.front_default,
                stats: data.stats.map(stat => ({
                    name: stat.stat.name,
                    value: stat.base_stat
                }))
            };
            setPokemon(detailedPokemon);
        } catch (error) {
            console.error('Error fetching pokemon:', error);
            setPokemon(null);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            fetchPokemon(searchTerm);
        }
    };

    return (
        <div className="pokedex-container">
            <div className="indicators">
                <div className="indicator red-indicator"></div>
                <div className="indicator yellow-indicator"></div>
                <div className="indicator green-indicator"></div>
            </div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for a Pokémon"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <div className="screen">
                {pokemon ? (
                    <>
                        <div className="pokemon-name">{pokemon.name}</div>
                        <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} />
                        <div className="pokemon-stats">
                            {pokemon.stats.map((stat, index) => (
                                <div key={index}>{stat.name}: {stat.value}</div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="pokemon-name">Pokémon not found</div>
                )}
            </div>
            <div className="controls">
                <button className="button" disabled={currentPage === 1} onClick={handlePrevPage}>Prev</button>
                <button className="button" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default PokemonList;
