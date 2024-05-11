import userAPIService from "../service/userAPIService";

const ShowUser = async (req, res) => {
    try {
        //let data = await userAPIService.GetAllUser();
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await userAPIService.GetUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (error) {
        console.log(">>>>>check error from usersController.js", error);
        return res.status(500).json({
            EM: "Error from userController.js",
            EC: "-1",
            DT: ""
        })
    }
}

const CreateFunc = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.fullName || !req.body.gender || !req.body.address || !req.body.groupId || !req.body.password) {
            return res.status(200).json({
                EM: "Missing employee information!",
                EC: "1",
                DT: []
            })
        }
        console.log(req.body)
        let response = await userAPIService.CreateNewUser(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(">>>>>check error from function CreateFunc of userController.js", error);
        return res.status(500).json({
            EM: "Error from function CreateFunc of userController.js",
            EC: "-1",
            DT: ""
        })
    }
}
const UpdateFunc = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.fullName || !req.body.gender || !req.body.address || !req.body.groupId) {
            return res.status(200).json({
                EM: "Missing employee information!",
                EC: "1",
                DT: []
            })
        }
        console.log(req.body)
        let response = await userAPIService.UpdateUser(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(">>>>>check error from function CreateFunc of userController.js", error);
        return res.status(500).json({
            EM: "Error from function CreateFunc of userController.js",
            EC: "-1",
            DT: ""
        })
    }
}
const DeleteFunc = async (req, res) => {
    try {
        let data = await userAPIService.DeleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(">>>>>check error from function DeleteFunc of usersController.js", error);
        return res.status(500).json({
            EM: "Error from function DeleteFunc of userController.js",
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = {
    ShowUser, CreateFunc, UpdateFunc, DeleteFunc
}