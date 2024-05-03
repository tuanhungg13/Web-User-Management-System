import express from "express";
import usersController from '../controller/usersController';
import groupController from '../controller/groupController';
const router = express.Router();

import { testAPI, handleRegister, handleLogin } from "../controller/apiHomeController";

const initAPIRoutes = (app) => {
    //api
    router.get("/test-api", testAPI);
    //login and register
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);
    //CRUD user
    router.get("/users/show", usersController.ShowUser);
    router.post("/users/create", usersController.CreateFunc);
    router.put("/users/update", usersController.UpdateFunc);
    router.delete("/users/delete", usersController.DeleteFunc);
    router.get("/group/read", groupController.ReadAllGroup)
    return app.use("/api/v1/", router);
}

module.exports = initAPIRoutes;