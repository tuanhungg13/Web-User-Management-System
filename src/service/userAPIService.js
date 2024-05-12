
import db from '../models/index';
import { checkEmailExist, checkPhoneNumberExist, handleHashPassword } from "../service/registerLoginUserService";
import { saveImageFile } from "../config/image";

const GetAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "email", "phone", "fullName", "gender", "address"],
            include: { model: db.Group, attributes: ["nameGR", "description"] }
        })

        if (users) {
            console.log(">>check list user", users);
            return ({
                EM: "get data success",
                EC: "0",
                DT: users
            })
        }
        else {
            return ({
                EM: "get data not success!",
                EC: "0",
                DT: ""
            })
        }
    } catch (error) {
        console.log(">>>> Check error from function GetAllUser of userAPIController.js:", error)
        return ({
            EM: "Error from userAPIController.js",
            EC: "-1",
            DT: ""
        })
    }
}

const GetUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["image", "id", "email", "phone", "fullName", "gender", "address"],
            include: { model: db.Group, attributes: ["id", "nameGR", "description"] }
        })
        let totalPages = Math.ceil(count / limit);
        const data = {
            totalRows: count,
            totalPages: totalPages,
            listUsers: rows
        }

        return ({
            EM: "Get user with page ok",
            EC: "0",
            DT: data
        })
    } catch (error) {
        console.log(">>>> Check error from function GetUserWithPagination of usesAPIController.js:", error)
        return ({
            EM: "Error from usesAPIController.js",
            EC: "-1",
            DT: ""
        })
    }
}

const CreateNewUser = async (dataImg, dataInfor) => {
    try {
        if (await checkEmailExist(dataInfor.email)) {
            return ({
                EM: "Email already exist !",
                EC: 1,
                DT: "emailError"
            })
        }
        else if (await checkPhoneNumberExist(dataInfor.phone)) {
            return ({
                EM: "Phone number already exist !",
                EC: 1,
                DT: "phoneNumberError"
            })
        }
        let hashPassword = handleHashPassword(dataInfor.password);
        await db.User.create({
            image: dataImg.path,
            email: dataInfor.email,
            phone: dataInfor.phone,
            password: hashPassword,
            fullName: dataInfor.fullName,
            address: dataInfor.address,
            gender: dataInfor.gender,
            groupId: dataInfor.groupId
        });
        return ({
            EM: "A user is created successfully",
            EC: 0,
            DT: []
        })
    } catch (error) {
        console.log(">>>> Check error from function CreateNewUser of usesAPIController.js:", error)
        return ({
            EM: "Error from usesAPIController.js",
            EC: "-1",
            DT: ""
        })
    }
}
const UpdateUser = async (data) => {
    try {
        const avatarPath = await saveImageFile(file);
        await db.User.update({
            image: avatarPath,
            fullName: data.fullName,
            address: data.address,
            gender: data.gender,
            groupId: data.groupId
        },
            {
                where: {
                    id: data.id
                }
            })
        return ({
            EM: "A user is updated successfully",
            EC: 0,
            DT: []
        })
    } catch (error) {
        console.log(">>>> Check error from function UpdateUser of usesAPIController.js:", error)
        return ({
            EM: "Error from function UpdateUser of usesAPIController.js",
            EC: "-1",
            DT: ""
        })
    }

}
const DeleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: { id: id }
        })
        return ({
            EM: "delete a user success!",
            EC: "0",
            DT: []
        })
    } catch (error) {
        console.log(">>>> Check error from usesAPIController.js:", error)
        return ({
            EM: "Error from usesAPIController.js",
            EC: "-1",
            DT: ""
        })
    }
}

module.exports = {
    GetAllUser, CreateNewUser, UpdateUser, DeleteUser, GetUserWithPagination
}