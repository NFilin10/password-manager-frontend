import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import auth from './auth';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            const isAuthenticated = await auth.authenticated();
            setIsAuthenticated(isAuthenticated);
            // setLoading(false);
        };

        checkAuthentication();
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
