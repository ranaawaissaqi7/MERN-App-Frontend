import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import Login from '../auth/Login';

export default function PrivateRoute({ Component }) {
    const { isAuth } = useContext(AuthContext);

    if (!isAuth) {
        return <Login />
    }

    return (
        <Component />
    )
}
