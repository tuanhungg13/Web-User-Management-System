import express from "express";
import usersController from '../controller/usersController';
import groupController from '../controller/groupController';
const router = express.Router();
import multer from 'multer'
import path from "path"
import { testAPI, handleRegister, handleLogin } from "../controller/apiHomeController";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Sử dụng path.resolve để đảm bảo đường dẫn là tuyệt đối
        cb(null, path.resolve(__dirname, "../assets/img"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

const initAPIRoutes = (app) => {
    //api
    router.get("/test-api", testAPI);
    //login and register
    router.post("/register", handleRegister);
    router.post("/login", handleLogin);
    //CRUD user
    router.get("/users/show", usersController.ShowUser);
    router.post("/users/upload/img", upload.single("image"), usersController.UploadImg)
    router.post("/users/create", usersController.CreateFunc);
    router.put("/users/update", usersController.UpdateFunc);
    router.delete("/users/delete", usersController.DeleteFunc);
    router.get("/group/read", groupController.ReadAllGroup)
    return app.use("/api/v1/", router);
}

module.exports = initAPIRoutes;