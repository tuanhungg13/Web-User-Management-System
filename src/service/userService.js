import axios from "axios";

const RegisterNewUser = (email, phone, fullName, password) => {
    return axios.post('http://localhost:8080/api/v1/register', {
        email, phone, fullName, password
    });
}

const LoginUser = (valueLogin, password) => {
    return axios.post('http://localhost:8080/api/v1/login', {
        valueLogin, password
    });
}

const FetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8080/api/v1/users/show?page=${page}&limit=${limit}`);
}

const DeleteUser = (user) => {
    return axios.delete(`http://localhost:8080/api/v1/users/delete`, { data: { id: user.id } });
}

const FetchGroup = () => {
    return axios.get(`http://localhost:8080/api/v1/group/read`);
}

export { RegisterNewUser, LoginUser, FetchAllUser, DeleteUser, FetchGroup };