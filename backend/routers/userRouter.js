const express = require("express");
const { addUser, getAllUsers, deleteUser } = require("../controllers/usersControllers");

const userRoute = express.Router();

userRoute.get("/users", getAllUsers);
userRoute.post("/user", addUser);
userRoute.delete("/user/:id", deleteUser);

module.exports = userRoute;
