import bcrypt from 'bcryptjs';
import pool from "../config/database";
import db from "../models/index";


const salt = bcrypt.genSaltSync(10);

const handleHashPassword = (password) => {
    return bcrypt.hashSync("password", salt);
}

const createNewUser = async (email, password, username) => {

    let hashPassword = handleHashPassword(password);

    try {
        await db.User.create({
            email: email,
            password: hashPassword,
            username: username
        });
        // For pool initialization, see above
        // const [results] = await pool.query(
        //     'insert into user (email,password,username) values (?,?,?)', [email, hashPassword, username],
        // );
        // Connection is automatically released when query resolves
    } catch (err) {
        console.log(err);
    }

}

const getAllUsers = async () => {
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "email", "fullName"],
        include: { model: db.Group },
        raw: true,
        nest: true
    })

    console.log("check newUser : ", newUser);

    let row = await db.Group.findOne({
        where: { id: 1 },
        include: { model: db.Role },
        raw: true,
        nest: true
    })

    let user = [];
    try {
        user = await db.User.findAll();
        // const [results] = await pool.query(
        //     'select * from user'
        // );
        // user = results;
    } catch (err) {
        console.log(err);
    }
    return user;
}

const deleteUser = async (id) => {
    try {
        // const [results] = await pool.query(
        //     'delete from user where id = ?', [id]
        // );
        await db.User.destroy({
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const getUserById = async (id) => {
    let user = {};
    // let user = [];
    try {
        // const [results] = await pool.query(
        //     'select * from user where id = ?', [id]
        // );
        // user = results;
        user = await db.User.findOne({
            where: { id: id }
        })
    } catch (err) {
        console.log(err);
    }
    return user;
}

const updateUser = async (id, email, username) => {
    try {
        // const [results] = await pool.query(
        //     'update user set email = ?, username = ? where id = ?', [email, username, id]
        // );
        await db.User.update({
            email: email,
            fullName: fullName,
        }, {
            where: {
                id: id
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createNewUser, getAllUsers, deleteUser, updateUser, getUserById };