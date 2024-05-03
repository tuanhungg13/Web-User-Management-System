import express from "express";
import { createNewUser, getAllUsers, deleteUser, getUserById, updateUser } from "../service/userService";

// Create the connection to database


const getHomePage = (req, res) => {
    return res.render("home.ejs");
}

const handleUserPage = async (req, res) => {
    const result = await getAllUsers();
    console.log('check result: ', result);
    return res.render("user.ejs", { listUsers: result });
}

const handleCreateNewUser = (req, res) => {
    let { email, password, username } = req.body;
    createNewUser(email, password, username);
    return res.redirect("/user");
}

const handleDeleteUser = async (req, res) => {
    console.log("check id:", req.params.id);
    await deleteUser(req.params.id);
    return res.redirect("/user")
}

const handleGetUserUpdate = async (req, res) => {
    let id = req.params.id;
    let result = await getUserById(id);
    // let userData = {};
    // if (result && result.length > 0) {
    //     userData = result[0];
    // }
    console.log("check user:", result);
    return res.render('user-update.ejs', { user: result });
}

const handleUpdatePage = async (req, res) => {
    console.log("check req.body: ", req.body);
    let { id, email, username } = req.body;
    await updateUser(id, email, username);
    return res.redirect("/user");
}

module.exports = {
    getHomePage, handleCreateNewUser, handleUserPage, handleDeleteUser, handleGetUserUpdate, handleUpdatePage
}