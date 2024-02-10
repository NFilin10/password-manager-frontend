import React, { useEffect } from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import auth from './auth';
import './App.css';

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const isAuthenticated = await auth.authenticated();
                const currentPath = window.location.pathname;

                if (!isAuthenticated && currentPath !== '/signup') {
                    // Redirect to login if not authenticated
                    navigate('/login');
                }
            } catch (error) {
                // Handle authentication error
                console.error('Authentication error:', error);
            }
        };

        // checkAuth();
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
