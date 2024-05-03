import { Routes, Route } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Users from '../ManageUsers/users';
import Register from '../Components/Register/Register';
import PrivateRoutes from './PrivateRoutes';


const AppRoutes = (props) => {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
