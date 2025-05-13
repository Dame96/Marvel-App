// src/components/NotFound.jsx

import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';  
import Badge from 'react-bootstrap/Badge';


function NotFound() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Countdown state

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Redirect to home page after countdown
        const timeout = setTimeout(() => {
            navigate('/'); // Redirect to home page
        }, 10000);

        // Clear interval and timeout on component unmount
        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);
    
    return (
            <Container>
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <p>You will be redirected to the home page in {countdown} seconds.</p>
                <Badge bg="primary" className="mb-3 fs-2">{countdown}</Badge>
                <p>Or you can always <Link to="/">Go to Home Page</Link></p>
            </Container>
    );
}

// Export the NotFound component
export default NotFound;