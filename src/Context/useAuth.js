import { useContext } from 'react';
import {AuthContext} from './AuthContext'; // Adjust the path as necessary

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
