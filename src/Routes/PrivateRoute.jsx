import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation, } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    // console.log(user);
    const location = useLocation()
    // console.log(location.pathname);


    if (loading) {
        return <Loading />
    }

    if (user && user?.email) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }
};

export default PrivateRoute;