import Router from '@/router';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const checkAuth = () => {
        return true;
    };
    useEffect(() => {
        const isAuthenticated = checkAuth();
        if (!isAuthenticated && location.pathname !== '/login') {
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [ location, navigate ]);
    return <Router />;
};

export default App;
