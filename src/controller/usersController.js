import userAPIService from "../service/userAPIService";
import groupService from '../service/groupService';

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
        let response = await userAPIService.CreateNewUser(req.body);
        return res.status(200).json({
            EM: response.EM,
            EC: response.EC,
            DT: response.DT
        })
    } catch (error) {
        console.log(">>>>>check error from userontroller.js", error);
        return res.status(500).json({
            EM: "Error from userController.js",
            EC: "-1",
            DT: ""
        })
    }
}
const UpdateFunc = () => {

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