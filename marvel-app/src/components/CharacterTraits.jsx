// src/components/CharacterTraits.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// Cretae a functional component to display character traits

function CharacterTraits() {
    const { id } = useParams(); // Get the character ID from the URL
    const [character, setCharacter] = useState(null); // State to store character data
    const [traits, setTraits] = useState([]); // State to store character traits
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state    

    // URL to fetch character traits from Database
    const url = `http://127.0.0.1:5000/characters/${id}`;
    // Fetch character data from the API
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setCharacter(response.data); // Set character data
            })
            .catch(error => {
                setError(`Failed to fetch character: ${error.message}`); // Set error if any
            })
            .finally(() => {
                setLoading(false); // Set loading to false
            });
    }, [id]); // Add dependency array to run useEffect only once

    if (error) {
        return <div>{error}</div>; // Show error message
    }
    if (!character) {
        return <div>Loading Character Traits...</div>; // Show loading state
    }

    return (
        <div>
           <h2>{character.name}</h2>
            <p><strong>Alias:</strong>{character.alias}</p>
            <p><strong>Alignment:</strong> {character.alignment}</p>
            <p><strong>Powers:</strong> {character.powers}</p>
            <img src={character.image_url} alt={character.name} width="200" />
          
        </div>
    );
};

// Export the CharacterTraits component 
export default CharacterTraits;