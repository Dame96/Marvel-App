// src/components/HomePage.jsx

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css'; // Import CSS file for styling


function HomePage() {
    return (
        <div className="page-background home-background">
            <Container>
                <Row>
                    <Col>
                        <h1>HELP! Earth is in Danger!!</h1>
                        <h3>Use this resource to access data for some of the characters from the Marvel Multiverse!</h3>
                        <p>The choice is yours...you can either choose a character from the list, or create your own character to save (or destroy...) the planet!</p>
                        <p>Assemble your team!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;