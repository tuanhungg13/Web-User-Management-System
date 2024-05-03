import { registerNewUser, handleUserLogin } from '../service/registerLoginUserService';

const testAPI = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "testapi"
    });
}

const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing require parameters", //error message
                EC: "1",                            //error code
                DT: ""                            //error element
            })
        }

        else if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: "Password must have more than 3 characters",
                EC: "1",
                DT: "passwordError"
            })
        }

        //service: create user
        let dataUser = await registerNewUser(req.body);

        return res.status(200).json({
            EM: dataUser.EM,
            EC: dataUser.EC,
            DT: dataUser.DT
        })

    } catch (e) {
        return res.status(500).json({
            EM: "Error from sever",
            EC: "-1",
            DT: ""
        })
    }
}

const handleLogin = async (req, res) => {
    try {
        let data = await handleUserLogin(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "Error from sever",
            EC: "-1",
            DT: ""
        })
    }

}
module.exports = { testAPI, handleRegister, handleLogin };