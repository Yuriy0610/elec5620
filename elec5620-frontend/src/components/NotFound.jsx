// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mt-5">
            <div className="bg-orange-50 text-center p-5 rounded shadow">
                <h1 className="display-1">404</h1>
                <h2 className="display-4">Oops! Page Not Found</h2>
                <p className="lead">
                    We're sorry, but the page you are looking for does not exist.
                </p>
                <Link to="/login" className="btn btn-primary btn-lg hover:bg-orange-100 transition-colors duration-200">
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default NotFound;