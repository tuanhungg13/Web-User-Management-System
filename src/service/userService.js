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

const UploadImage = (image) => {
    return axios.post('http://localhost:8080/api/v1/users/upload/img', image, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

const CreateNewUser = (email, phone, fullName, password, gender, address, groupId) => {
    return axios.post('http://localhost:8080/api/v1/users/create', {
        email, phone, fullName, password, gender, address, groupId
    });
}

const UpdateUser = (id, email, phone, fullName, gender, address, groupId) => {
    return axios.put('http://localhost:8080/api/v1/users/update', {
        id, email, phone, fullName, gender, address, groupId
    });
}

export { RegisterNewUser, LoginUser, FetchAllUser, DeleteUser, FetchGroup, UploadImage, CreateNewUser, UpdateUser };