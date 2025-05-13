// src/components/Characters.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import '../App.css'; // Import CSS file for styling


function Characters() {
    const [characters, setCharacters] = useState([]); // State to store characters
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state
    // Url to fetch characters from Database
    const url = 'http://127.0.0.1:5000/characters';



    useEffect(() => {
        axios.get(url)
            .then(response => {
                setCharacters(response.data); // Set characters data
                setLoading(false); // Set loading to false
            })
            .catch(error => {
                setError(`Failed to fetch characters: ${error.message}`); // Set error if any
                setLoading(false); // Set loading to false
            });
    }, []); // Add dependency array to run useEffect only once


    if (loading) {
        return (
            <Container>
                <h3>
                    <Spinner animation="border" role="status" variant="info"
                        style={{ marginRight: '15px' }} />
                    Loading Characters...
                </h3>
            </Container>
        ) // Show loading state
    }


    if (error) return <div>{error}</div>; // Show error message


    // Create a functional component to Display Characters using Bootstrap Card components

    return (
        <div className="page-background characters-background">
            <Container>
                <h3>Marvel Characters</h3>
                <Row>
                    {characters.map(character => (
                        <Col key={character.id} xs={12} md={6} lg={4} className="mb-4">
                            <Card style={{ width: '18' }}>
                                <Card.Img variant="top" src={character.image_url} alt={character.name} />
                                <Card.Body>
                                    <Card.Title>{character.name}</Card.Title>
                                    <Card.Text>
                                        {character.alias}
                                    </Card.Text>
                                    <Link to={`/characters/${character.id}`}>
                                        <Button variant="info">View Details</Button>
                                    </Link>
                                    <Link to={`/editcharacter/${character.id}`} className="btn btn-warning">
                                        Edit Character
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );


}
// Export the Characters component
export default Characters;

