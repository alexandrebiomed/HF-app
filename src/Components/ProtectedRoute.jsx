import { Navigate } from 'react-router-dom';
import useAuth from '../Context/useAuth'; // Adjust the path as necessary

import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? element : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired, // Ensures children are required
};

export default ProtectedRoute;
