// src/components/CYO.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import { useEffect } from 'react';
import '../App.css'; // Import CSS file for styling

// Create a functional component using React Boostrap Components Forms and Buttons to create a character with visual confirmation when the character is created

function CYO() {
    const [formData, setFormData] = useState({
        characterName: '',
        characterAlias: '',
        characterPowers: '',
        characterAlignment: '',
        image_url: '',
    }); // State to manage form data

    const [loading, setLoading] = useState(false); // State to manage loading state
    const [success, setSuccess] = useState(false); // State to manage success state
    const [validated, setValidated] = useState(false); // State to manage form validation
    const navigate = useNavigate(); // Hook to programmatically navigate
    const url = 'http://127.0.0.1:5000/characters'; // URL to fetch characters from Database


    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value // Update the corresponding field in form data
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        const form = e.currentTarget; // Get the current form
        e.preventDefault(); // Prevent default form submission
        e.stopPropagation(); // Stop event propagation
        setValidated(true);// Set form validation state to true
        if (form.checkValidity() === false) {
            return;

        } else {
            setLoading(true); // Set loading state to true

            try {
                await createCharacter(); // Call the API
                setSuccess(true); // Set success state to true
                setValidated(false); // Reset form validation state
            }
            catch (error) {
                console.error('Error creating character:', error); // Log error if any
            }
            finally {
                setLoading(false); // Set loading state to false
            }
        }
    };

    // Function to handle API call to create a character
    const createCharacter = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.characterName,
                    alias: formData.characterAlias,
                    powers: formData.characterPowers,
                    alignment: formData.characterAlignment,
                    image_url: formData.image_url,
                }),
            });
            if (!response.ok) throw new Error('Failed to create character');
            const data = await response.json();
            console.log('Character created:', data);
        } catch (error) {
            console.error('Error creating character:', error);
        }
    };

    useEffect(() => {
        // Reset all state on component mount
        setSuccess(false);
        setLoading(false);
        setFormData({
            characterName: '',
            characterAlias: '',
            characterPowers: '',
            characterAlignment: '',
            image_url: '',
        });
    }, []);

    // Redirect after success 
    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                navigate('/characters'); // Redirect to characters page after 2 seconds
            }, 2000);
            return () => clearTimeout(timeout); // Clear timeout on component unmount
        }
    }, [success, navigate]);

    // Form to create a character
    return (
        <div className="page-background cyo-background">
            <Container>
                <Row>
                    <Col>
                        <h1>Create Your Own Character</h1>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group controlId="characterName">
                                <Form.Label>Character Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="characterName"
                                    placeholder="Enter character name"
                                    value={formData.characterName}
                                    onChange={handleChange}
                                    required
                                    isInvalid={validated && !formData.characterName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a character name.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="characterAlias">
                                <Form.Label>Character Alias</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="characterAlias"
                                    placeholder="Enter character alias"
                                    value={formData.characterAlias}
                                    onChange={handleChange}
                                    required
                                    isInvalid={validated && !formData.characterAlias}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a character alias.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="characterPowers">
                                <Form.Label>Character Powers</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="characterPowers"
                                    placeholder="Enter character powers"
                                    value={formData.characterPowers}
                                    onChange={handleChange}
                                    required
                                    isInvalid={validated && !formData.characterPowers}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide character powers.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="characterAlignment">
                                <Form.Label>Character Alignment</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="characterAlignment"
                                    placeholder="Enter character alignment"
                                    value={formData.characterAlignment}
                                    onChange={handleChange}
                                    required
                                    isInvalid={validated && !formData.characterAlignment}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide character alignment.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="image_url">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image_url"
                                    placeholder="Enter image URL(cannot exceed 255 characters)"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    required
                                    isInvalid={validated && !formData.image_url}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide an image URL.
                                </Form.Control.Feedback>
                            </Form.Group>


                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? 'Creating Character...' : 'Create Character'}
                            </Button>
                        </Form>

                        {success && (
                            <div className="mt-3">
                                <Badge bg="success">Character Created Successfully!</Badge>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>

    )

};
// Export the CYO component
export default CYO;

