import './nav.scss';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Nav = () => {
    const [isShow, setIsShow] = useState(false);
    //let location = useLocation();
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setIsShow(true);
        }
    }, [])
    return (
        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>

    );
}

export default Nav;