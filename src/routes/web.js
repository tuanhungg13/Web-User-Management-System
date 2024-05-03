import express from "express";
import { getHomePage, handleUserPage, handleCreateNewUser, handleDeleteUser, handleGetUserUpdate, handleUpdatePage } from "../controller/homeController";
const router = express.Router();

/**
 * @param {*} app - express app
 */


const initWebRoutes = (app) => {
    router.get("/", getHomePage);
    router.get("/user", handleUserPage);
    router.post("/users/create-user", handleCreateNewUser);
    router.post("/delete-user/:id", handleDeleteUser);
    router.get("/update-user/:id", handleGetUserUpdate);
    router.post("/users/update-user/:id", handleUpdatePage)

    return app.use("/", router);

}

module.exports = initWebRoutes;