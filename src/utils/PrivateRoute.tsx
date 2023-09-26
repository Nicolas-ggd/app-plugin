import { Outlet, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
    const userAccessToken = localStorage.getItem('access_token');

    return (
        userAccessToken ? <Outlet /> : <Navigate to="/" />
    );
};