import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import iconAddPicture from '../img/iconThemAnh.png';
import './modalCreateUser.scss';
import Form from 'react-bootstrap/Form';
import { FetchGroup } from "../service/userService";
import { useEffect, useState } from 'react';
import { AiFillFileAdd } from "react-icons/ai";

const ModalCreateUser = (props) => {
    const [UserGroups, setUserGroups] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [group, setGroup] = useState("")
    const [uploadImage, setUploadImage] = useState(null);

    useEffect(() => {
        getGroups();
    }, [])
    const getGroups = async () => {
        let response = await FetchGroup();
        if (response && response.data && +response.data.EC === 0) {
            setUserGroups(response.data.DT)
        }
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            // Khi tệp đã được đọc thành công, đặt state mới với URL của ảnh
            setUploadImage(fileReader.result);
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }
    return (
        <>
            <Modal show={true} onHide={props.handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-create-user row'>
                        <div className='content-left col-12 col-sm-3'>
                            <div className='container-img col-12 d-block'>
                                {uploadImage ? (
                                    <img src={uploadImage} alt='Selected Image' />
                                ) : (
                                    <img src={iconAddPicture} alt='Add Picture' />
                                )}
                                <label for="file-upload" className="custom-file-upload ms-3 mt-2">
                                    <AiFillFileAdd style={{ fontSize: '45px' }} />Choose file
                                </label>
                                <input className='d-none' id="file-upload" type='file' onChange={(event) => handleImg(event)} />
                            </div>

                        </div>
                        <div className='content-right col-12 col-sm-9 row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    onChange={(event) => { setEmail(event.target.value) }} />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Phone Number</label>
                                <input className='form-control' type='text'
                                    onChange={(event) => { setPhone(event.target.value) }} />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Full Name</label>
                                <input className='form-control' type='text'
                                    onChange={(event) => { setFullName(event.target.value) }} />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Password</label>
                                <input className='form-control' type='password'
                                    onChange={(event) => { setPassword(event.target.value) }} />
                            </div>
                            <div className='col-12 col-sm-12 form-group'>
                                <label>Address</label>
                                <input className='form-control'
                                    onChange={(event) => { setAddress(event.target.value) }} />
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Gender</label>
                                <Form.Select aria-label="Default select example">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Group</label>
                                <Form.Select aria-label="Default select example">
                                    {UserGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item}>
                                                {item.nameGR}
                                            </option>
                                        )
                                    })}

                                </Form.Select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalCreateUser;