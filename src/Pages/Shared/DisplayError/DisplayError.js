import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <p className="text-red-500">Something went Wrong</p>
            <p className="text-red-400">{error.statusText || error.message}</p>
            <h4 className="text-red-400">Please <button onClick={handleLogOut}>signOut</button>sign in back </h4>
        </div>
    );
};

export default DisplayError;