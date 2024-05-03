import './Login.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../service/userService';
import { useEffect } from 'react';

const Login = (props) => {
    let navigate = useNavigate();
    const handleRegister = () => {
        navigate('/register');
    }

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        valueLogin: "",
        password: "",
    });
    const [errorsBE, setErrorsBE] = useState({
        errorBE: ""
    })

    const handleLogin = async () => {
        const newErrors = {};
        const newErrorsBE = {};
        if (!valueLogin) {
            newErrors.valueLogin = "Please enter your email address or phone number";
        }
        if (!password) {
            newErrors.password = "Please enter your password";
        }
        setErrors(newErrors);
        let responseLG = await LoginUser(valueLogin, password);
        console.log("check responeLogin: ", responseLG)
        if (responseLG && responseLG.data && +responseLG.data.EC === 1 && responseLG.data.DT === "error") {
            newErrorsBE.errorBE = responseLG.data.EM;
            setErrorsBE(newErrorsBE);
        }
        if (responseLG && responseLG.data && +responseLG.data.EC === 0) {
            let data = {
                isAuthenticated: true,
                token: "fake token"
            }
            sessionStorage.setItem("account", JSON.stringify(data));
            navigate("/users");
            window.location.reload();
        }
    }

    const handleEnterPress = (event) => {
        console.log(event);
        if (event.key === "Enter") {
            handleLogin();
        }
    }

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            navigate("/")
            window.location.reload();
        }
    }, [navigate])

    return (
        <div className="login-container mt-5">
            <div className='container'>
                <div className='row px-3 px-sm-5'>
                    <div className='content-left col-12 d-none col-sm-8 d-sm-block'>
                        <div className='brand'>HwgLee</div>
                        <div className='detail'>Welcome from user's management project</div>
                    </div>

                    <div className='content-right col-sm-4 col-12 d-flex flex-column gap-2 py-3'>
                        <h2 className='mb-5 text-center'>Login</h2>
                        <input className={` form-control ${errors.valueLogin || errorsBE.errorBE ? "is-invalid" : ""} `} type='text' placeholder='Email address or phone number'
                            onChange={(event) => setValueLogin(event.target.value)} />
                        {errors.valueLogin && <div className='invalid-feedback'>{errors.valueLogin}</div>}
                        <input className={`form-control ${errors.password || errorsBE.errorBE ? "is-invalid" : ""}`} type='password' placeholder='Password'
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => { handleEnterPress(event) }} />
                        {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                        {errorsBE.errorBE && <div className='invalid-feedback'>{errorsBE.errorBE}</div>}

                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}>Login</button>
                        {/* <span className='text-center'> <a className='forgot-password' href='#'>Forgot yours password?</a></span> */}

                        <div className='text-center'>
                            <hr className='mx-5' />
                            <button className='btn btn-success mt-2' onClick={handleRegister}>Create a new Accout</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;