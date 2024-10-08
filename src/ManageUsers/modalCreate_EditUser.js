import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import iconAddPicture from '../img/iconThemAnh.png';
import './modalCreate_EditUser.scss';
import Form from 'react-bootstrap/Form';
import { FetchGroup } from "../service/userService";
import { useEffect, useState } from 'react';
import { AiFillFileAdd } from "react-icons/ai";
import { UploadImage, CreateNewUser, UpdateUser } from '../service/userService';
import { toast } from 'react-toastify';


const ModalCreateUser = (props) => {
    const [UserGroups, setUserGroups] = useState([]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [groupId, setGroupId] = useState("")
    const [displayImg, setDisplayImg] = useState(null)
    const [image, setImage] = useState();
    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        password: "",
        fullName: "",
        address: "",
    });
    const [errorBackend, setErrorsBackend] = useState({
        email: "",
        phone: "",
    });
    useEffect(() => {
        getGroups();
    }, [])
    useEffect(() => {
        console.log("check props dataModal", props.dataModalEditUser)
        if (props.action === "UPDATE") {
            //setDisplayImg(`file://${props.dataModalEditUser.image}` || "")
            setEmail(props.dataModalEditUser.email || "");
            setPhone(props.dataModalEditUser.phone || "");
            setFullName(props.dataModalEditUser.fullName || "")
            setPassword(props.dataModalEditUser.password);
            setAddress(props.dataModalEditUser.address || "");
            setGender(props.dataModalEditUser.gender || "");
            setGroupId(props.dataModalEditUser.Group?.id || "");
        }

    }, [props.dataModalEditUser])
    const getGroups = async () => {
        let response = await FetchGroup();
        if (response && response.data && +response.data.EC === 0) {
            setUserGroups(response.data.DT)
        }
    }
    const handleImg = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        console.log("check formData", formData)
        setImage(formData);
        const fileReader = new FileReader();
        console.log("check image", image);
        fileReader.onloadend = () => {
            // Khi tệp đã được đọc thành công, đặt state mới với URL của ảnh
            setDisplayImg(fileReader.result);
        };
        if (file) {
            fileReader.readAsDataURL(file);
        }
    }

    const isValidInput = () => {
        let isValid = true;
        const newErrors = {};

        if (!email) {
            newErrors.email = "Email is required";
            isValid = false;
        } else {
            let regx = /\S+@\S+\.\S+/;
            if (!regx.test(email)) {
                newErrors.email = "Invalid email format";
                isValid = false;
            }
        }

        if (!phone) {
            newErrors.phone = "Phone number is required";
            isValid = false;
        }

        if (!password && props.action === "CREATE") {
            newErrors.password = "Password is required";
            isValid = false;
        }
        if (!fullName) {
            newErrors.fullName = "Full Name is require";
        }
        if (!address) {
            newErrors.address = "Address is require";
        }
        if (!groupId) {
            newErrors.groupId = "Group is require";
        }
        if (!gender) {
            newErrors.gender = "Gender is require";
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleCloseModal = () => {
        props.handleClose();
        const newErrors = {}
        for (let i = 0; i < errors.length; i++) {
            newErrors.errors[i] = "";
        }
        setDisplayImg("")
        setAddress("");
        setEmail("");
        setPhone("");
        setFullName("");
        setPassword("");
        setGender("");
        setGroupId("");
        setErrors(newErrors);
    }

    const handleConfirmModalUser = async () => {
        let check = isValidInput();
        const newErrorsBE = {};
        if (check === true) {
            if (props.action === "CREATE") {
                let resImg = await UploadImage(image);
                let response = await CreateNewUser(email, phone, fullName, password, gender, address, groupId);
                console.log(response);
                if (+response.data.EC === 0) {
                    toast.success(response.data.EM);
                    await props.fetchUsers();
                    handleCloseModal();
                }
                else {
                    console.log(response.data.EM);
                    console.log(response.data.DT, response.data.DT.length)
                    if (response.data.DT === "emailError") {
                        newErrorsBE.email = response.data.EM;
                    }
                    else if (response.data.DT === "phoneError") {
                        newErrorsBE.phone = response.data.EM;

                    }
                }
            }
            else {
                console.log("check update hehe:")
                let response = await UpdateUser(props.dataModalEditUser.id, email, phone, fullName, gender, address, groupId);
                console.log(response);
                if (+response.data.EC === 0) {
                    toast.success(response.data.EM);
                    await props.fetchUsers();
                    handleCloseModal();
                }
            }
        }
        setErrorsBackend(newErrorsBE);
    }
    return (
        <>
            <Modal show={props.show} onHide={handleCloseModal} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div>{props.action === "CREATE" ? "Create new user" : "Edit a user"}</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container-create-user row'>
                        <div className='content-left col-12 col-sm-3'>
                            <div className='container-img col-12 d-block'>
                                {displayImg ? (
                                    <img src={displayImg} alt="" />
                                ) : (
                                    <img src={iconAddPicture} alt="" />
                                )}
                                <label htmlFor="file-upload" className="custom-file-upload ms-3 mt-2">
                                    <AiFillFileAdd style={{ fontSize: '45px' }} />Choose file
                                </label>
                                <input className='d-none' id="file-upload" type='file' onChange={(event) => handleImg(event)} />
                            </div>

                        </div>
                        <div className='content-right col-12 col-sm-9 row'>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Email</label>
                                <input disabled={props.action === "CREATE" ? false : true}
                                    className={`form-control ${errors.email || errorBackend.email ? "is-invalid" : ""}`}
                                    type='email' value={email}
                                    onChange={(event) => { setEmail(event.target.value) }} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                {errorBackend.email && <div className='invalid-feedback'>{errorBackend.email}</div>}
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Phone Number</label>
                                <input disabled={props.action === "CREATE" ? false : true}
                                    className={`form-control ${errors.phone || errorBackend.phone ? "is-invalid" : ""}`} type='text' value={phone}
                                    onChange={(event) => { setPhone(event.target.value) }} />
                                {errors.email && <div className='invalid-feedback'>{errors.phone}</div>}
                                {errorBackend.phone && <div className='invalid-feedback'>{errorBackend.phone}</div>}
                            </div>
                            <div className={props.action === "CREATE" ? 'col-12 col-sm-6 form-group' : 'col-12 form-group'}>
                                <label>Full Name</label>
                                <input className={`form-control ${errors.fullName ? "is-invalid" : ""}`} type='text' value={fullName}
                                    onChange={(event) => { setFullName(event.target.value) }} />
                                {errors.fullName && <div className='invalid-feedback'>{errors.fullName}</div>}
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                {props.action === "CREATE" &&
                                    <>
                                        <label>Password</label>
                                        <input className={`form-control ${errors.password ? "is-invalid" : ""}`} type='password' value={password}
                                            onChange={(event) => { setPassword(event.target.value) }} />
                                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                    </>
                                }
                            </div>
                            <div className='col-12 col-sm-12 form-group'>
                                <label>Address</label>
                                <input className={`form-control ${errors.address ? "is-invalid" : ""}`} type="text" value={address}
                                    onChange={(event) => { setAddress(event.target.value) }} />
                                {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Gender</label>
                                <Form.Select className={`form-control ${errors.gender ? "is-invalid" : ""}`} value={gender}
                                    onChange={(event) => { setGender(event.target.value) }}>
                                    {!gender && <option>Select Gender</option>}
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                                {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
                            </div>
                            <div className='col-12 col-sm-6 form-group'>
                                <label>Group</label>
                                <Form.Select className={`form-control ${errors.groupId ? "is-invalid" : ""}`} value={groupId}
                                    onChange={(event) => { setGroupId(event.target.value) }}>
                                    {!groupId && <option>Select Group</option>}
                                    {UserGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>
                                                {item.nameGR}
                                            </option>
                                        )
                                    })}
                                </Form.Select>
                                {errors.groupId && <div className='invalid-feedback'>{errors.groupId}</div>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleConfirmModalUser() }}>
                        {props.action === "CREATE" ? "Save" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
export default ModalCreateUser;