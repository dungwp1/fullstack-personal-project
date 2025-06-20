import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleCreateUser = () => {
        navigate('/login');
    };
    const handleAddItem = () => {
        navigate('/add');
    };
    return (
        <header className="flex p-4 bg-gray-100 gap-4">
            <h1 className="text-2xl font-bold" onClick={() => handleCreateUser()}>Create User</h1>
            <h1 className="text-2xl font-bold" onClick={() => handleAddItem()}>Add Item</h1>
            <h1 className="text-2xl font-bold">...</h1>
        </header>
    );
};

export default Header;