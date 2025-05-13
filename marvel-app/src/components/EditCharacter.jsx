// src/components/EditCharacter.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const url = 'http://127.0.0.1:5000/characters'; // URL to fetch characters from Database

function EditCharacter() {
    const [formData, setFormData] = useState({
        characterName: '',
        characterAlias: '',
        characterPowers: '',
        characterAlignment: '',
        image_url: '',
    }); // State to manage form data


    const [error, setError] = useState(null); // State to manage error state
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [success, setSuccess] = useState(false); // State to manage success state
    const [validated, setValidated] = useState(false); // State to manage form validation
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [submitting, setSubmitting] = useState(false); // State to manage form submission
    const { id } = useParams(); // Get the character ID from the URL

    // Fetch character data from the API
    useEffect(() => {
        setLoading(true); // Set loading state to true
        axios.get(`${url}/${id}`)
            .then(response => {
                setFormData({
                    characterName: response.data.name,
                    characterAlias: response.data.alias,
                    characterPowers: response.data.powers,
                    characterAlignment: response.data.alignment,
                    image_url: response.data.image_url,
                });
            })
            .catch(error => {
                setError(`Failed to fetch character: ${error.message}`); // Set error if any
            })
            .finally(() => {
                setLoading(false); // Set loading to false
            });
    }, [id]); // Add dependency array to run useEffect only once
    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update the corresponding field in form data
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) return;

        setSubmitting(true); // show "updating..."
        try {
            const response = await axios.put(`${url}/${id}`, {
                name: formData.characterName,
                alias: formData.characterAlias,
                powers: formData.characterPowers,
                alignment: formData.characterAlignment,
                image_url: formData.image_url,
            });

            if (response.status === 200) {
                setSuccess(true);
                setValidated(false);
                setTimeout(() => navigate('/characters'), 1500); // short delay before redirect
            }
        } catch (error) {
            console.error('Error updating character:', error);
        } finally {
            setSubmitting(false);
        }
    };



    // Function to handle character deletion
    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this character?');
        if (!confirmDelete) return;

        setSubmitting(true);
        try {
            const response = await axios.delete(`${url}/${id}`);
            if (response.status === 200) {
                alert('Character deleted successfully!');
                navigate('/characters');
            } else {
                console.error('Error deleting character:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting character:', error);
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) {
        return (
            <Container>
                <h3>
                    <Spinner animation="border" role="status" variant="info"
                        style={{ marginRight: '15px' }} />
                    Loading Character...
                </h3>
            </Container>
        ); // Show loading state
    }

    if (error) return <div><Alert variant="danger">{error}</Alert></div>; // Show error message

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <h3>Edit Character</h3>
                    {success && (
                        <Alert variant="success">
                            Character updated successfully!
                        </Alert>
                    )}
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group controlId="formCharacterName">
                            <Form.Label>Character Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter character name"
                                name="characterName"
                                value={formData.characterName}
                                onChange={handleChange}
                                disabled={submitting}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid character name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCharacterAlias">
                            <Form.Label>Character Alias</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter character alias"
                                name="characterAlias"
                                value={formData.characterAlias}
                                onChange={handleChange}
                                disabled={submitting}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid character alias.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formCharacterPowers">
                            <Form.Label>Character Powers</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter character powers"
                                name="characterPowers"
                                value={formData.characterPowers}
                                onChange={handleChange}
                                disabled={submitting}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide valid character powers.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formCharacterAlignment">
                            <Form.Label>Character Alignment</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter character alignment"
                                name="characterAlignment"
                                value={formData.characterAlignment}
                                onChange={handleChange}
                                disabled={submitting}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid character alignment.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCharacterImage">
                            <Form.Label>Character Image URL</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter character image URL"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                disabled={submitting}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid image URL.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2" // adds spacing to the right of the spinner
                                    />
                                    Updating...
                                </>
                            ) : (
                                'Update Character'
                            )}
                        </Button>

                        <Button variant="danger" onClick={handleDelete} disabled={submitting}>
                            {submitting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Processing...
                                </>
                            ) : (
                                'Delete Character'
                            )}
                        </Button>


                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

// Export the EditCharacter component
export default EditCharacter;


