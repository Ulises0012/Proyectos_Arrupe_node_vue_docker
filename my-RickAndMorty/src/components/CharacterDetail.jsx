// CharacterDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        fetchCharacter();
    }, [id]);

    const fetchCharacter = async () => {
        try {
            const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
            setCharacter(response.data);
        } catch (error) {
            console.error('Error fetching character details:', error);
        }
    };

    if (!character) return <div>Loading...</div>;

    return (
        <div>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name} />
            <p>Species: {character.species}</p>
            <p>Origin: {character.origin.name}</p>
            <p>Status: {character.status}</p>
            <p>Episodes:</p>
            <ul>
                {character.episode.map((episode, index) => (
                    <li key={index}>{episode}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetails;
