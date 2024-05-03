import './Register.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RegisterNewUser } from '../../service/userService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


const Register = (props) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
    }, [])

    let navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [errorBackend, setErrorsBackend] = useState({
        email: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
    }, [])

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

        if (!password) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (password.length < 4) {
            newErrors.password = "Password must have more than 3 characters";
            isValid = false
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }
    const handleRegister = async () => {
        let check = isValidInput();
        const newErrorsBE = {};
        if (check === true) {
            let response = await RegisterNewUser(email, phone, fullName, password);
            console.log(response);
            if (+response.data.EC === 0) {
                toast.success(response.data.EM);
                navigate("/login")
            }
            else {
                console.log(response.data.EM);
                console.log(response.data.DT, response.data.DT.length)
                if (response.data.DT === "emailError") {
                    newErrorsBE.email = response.data.EM;

                    // newErrorsBE.phone = "";
                    // newErrorsBE.password = "";

                }
                else if (response.data.DT === "phoneError") {
                    newErrorsBE.phone = response.data.EM;
                    // newErrorsBE.email = "";
                    // newErrorsBE.password = "";
                }
                else if (response.data.DT === "passwordError") {
                    newErrorsBE.password = response.data.EM;
                    // newErrorsBE.email = "";
                    // newErrorsBE.phone = "";
                }
            }
        }
        setErrorsBackend(newErrorsBE);
        console.log(errorBackend.email);
    }

    const handleEnterPress = (event) => {
        console.log(event);
        if (event.key === "Enter") {
            handleRegister();
        }

    }

    return (
        <div className="register-container mt-5">
            <div className='container'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 d-none col-sm-8 d-sm-block'>
                        <div className='brand'>HwgLee</div>
                        <div className='detail'>Register</div>
                    </div>

                    <div className='content-right col-sm-4 col-12 d-flex flex-column gap-2 py-3'>
                        <h2 className='mb-5 text-center'>Register</h2>
                        <div className='form-group'>
                            <label>Email Address</label>
                            <input className={`form-control ${errors.email || errorBackend.email ? " is-invalid" : ""}`} type='text' placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            {errorBackend.email && <div className='invalid-feedback'>{errorBackend.email}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Phone number</label>
                            <input className={`form-control ${errors.phone || errorBackend.phone ? " is-invalid" : ""}`} type='text' placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                            {errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
                            {errorBackend.phone && <div className='invalid-feedback'>{errorBackend.phone}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Full Name</label>
                            <input className="form-control" type='text' placeholder='Full Name'
                                value={fullName} onChange={(event) => setFullName(event.target.value)} />

                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input className={`form-control ${errors.password || errorBackend.password ? " is-invalid" : ""}`} type='password' placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)} />
                            {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                            {errorBackend.password && <div className='invalid-feedback'>{errorBackend.password}</div>}
                        </div>

                        <div className='form-group'>
                            <label>Re-enter Password</label>
                            <input className={`form-control ${errors.confirmPassword ? " is-invalid" : ""}`} type='password' placeholder='Re-enter Password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                                onKeyDown={(event) => { handleEnterPress(event) }}
                            />
                            {errors.confirmPassword && <div className='invalid-feedback'>{errors.confirmPassword}</div>}
                        </div>
                        <button className='btn btn-primary mt-2'
                            onClick={() => handleRegister()}
                        >Register</button>

                        <div className='text-center'>
                            <hr className='mx-5' />
                            <span>Already've an account. <Link to='/login'>Login</Link></span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;