import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (!session) {
            navigate("/login");
        }
    }, [navigate]); // Đảm bảo useEffect chỉ chạy lại khi navigate thay đổi
    return (
        <>
            <Outlet />
        </>
    );
}

export default PrivateRoutes;
