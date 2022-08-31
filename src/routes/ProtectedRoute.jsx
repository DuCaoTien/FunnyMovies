import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const signedUser = JSON.parse(localStorage.getItem('signedUser')) || '';
    if (!signedUser) {
        return <Navigate to="/" />;
    }
    return children;
};
