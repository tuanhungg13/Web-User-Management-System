import { Routes, Route } from 'react-router-dom';
import Login from '../Components/Login/Login';
import Users from '../ManageUsers/users';
import Register from '../Components/Register/Register';
import PrivateRoutes from './PrivateRoutes';
import ModalCreateUser from '../ManageUsers/modalCreate_EditUser';

const AppRoutes = (props) => {
    return (
        // <Routes>
        //     <Route element={<PrivateRoutes />}>
        //         <Route path="/users" element={<Users />} >
        //             <Route path="/create" element={<ModalCreateUser />} />
        //         </Route>

        //     </Route>
        //     <Route path="/login" element={<Login />} />
        //     <Route path="/register" element={<Register />} />
        // </Routes>
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route path="/users" element={<Users />} >
                    {/* Đường dẫn của route con bắt đầu với đường dẫn của route cha */}
                    <Route path="create" element={<ModalCreateUser />} />
                    <Route path="update" element={<ModalCreateUser />} />
                    <Route path="delete" element={<ModalCreateUser />} />
                </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes;
