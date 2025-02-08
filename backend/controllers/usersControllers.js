const usersModel = require("../models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find();
    res.json({ status: 1, msg: "user data received", employees: users });
  } catch (error) {
    res.status(500).json({ status: 0, msg: "Fail to get data", message: error.message });
  }
};

const addUser = async (req, res) => {
  const { name, email, age, phone, salary, _id } = req.body;

  const newUser = {
    name,
    email,
    age: Number(age),
    phone,
    salary: Number(salary),
  };

  if (_id) {
    try {
      const user = await usersModel.findByIdAndUpdate(_id, newUser, { new: true });
      res.json({ status: 1, msg: "User updated successfully", user: user });
    } catch (error) {
      res.status(500).json({ status: 0, msg: "Fail to update data", error });
    }
  } else {
    try {
      const result = await new usersModel(newUser);
      const savedUser = await result.save();
      res.status(201).json({ status: 1, msg: "user created successfully", savedUser });
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    result = await usersModel.deleteOne({ _id: id });
    res.json({ status: 1, msg: "user deleted successfully", result });
  } catch (error) {
    res.status(500).json({ status: 0, msg: "fail to delete user", error });
  }
};

module.exports = { addUser, getAllUsers, deleteUser };
