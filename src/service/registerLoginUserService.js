import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize'


const salt = bcrypt.genSaltSync(10);

const handleHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);;

}

const checkEmailExist = async (email) => {
    if (await db.User.findOne({
        where: { email: email }
    })) {
        return true;
    }
    return false;
}

const checkPhoneNumberExist = async (phone) => {
    if (await db.User.findOne({
        where: { phone: phone }
    })) {
        return true;
    }
    return false;
}



const registerNewUser = async (rawUserData) => {
    // check email, phone
    try {
        if (await checkEmailExist(rawUserData.email)) {
            return ({
                EM: "Email already exists!",
                EC: "1",
                DT: "emailError"
            })
        }
        else if (await checkPhoneNumberExist(rawUserData.phone)) {
            return ({
                EM: "Phone number already exists!",
                EC: "1",
                DT: "phoneError"
            })
        }


        let hashPassword = handleHashPassword(rawUserData.password);

        await db.User.create({
            email: rawUserData.email,
            phone: rawUserData.phone,
            username: rawUserData.username,
            password: hashPassword
        })
        return ({
            EM: "A user is created successfully",
            EC: "0",
            DT: ""
        })
    } catch (e) {
        console.log("check error:", e)
        return ({
            EM: "Something wrongs in service!",
            EC: "1",
            DT: "serviceError"
        })
    }
}

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {    //check user exist
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ],
            }
        })
        console.log("check user : ", user.get({ plain: true }));
        if (user) {
            console.log("found user with phone/email")
            console.log("rawData:", rawData);
            if (checkPassword(rawData.password, user.password)) {    // check inputPasword vs password in database
                return ({
                    EM: "Login successfully",
                    EC: "0",
                    DT: ""
                })
            }
        }
        return ({
            EM: "Your email/phone number or password is incorrect!",
            EC: "1",
            DT: "error"
        })


    } catch (error) {
        console.log("check error:", error)
        return ({
            EM: "Something wrongs in service!",
            EC: "1",
            DT: "serviceError"
        })
    }
}

module.exports = {
    registerNewUser, handleUserLogin, checkEmailExist, checkPhoneNumberExist, handleHashPassword
}