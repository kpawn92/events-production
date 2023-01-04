"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersByRole = exports.users = exports.user = exports.toInvalidateUser = exports.getManagersActived = exports.editUserById = void 0;
var _entity = require("../models/entity");
var _env = require("../config/env");
var _helpers = require("../helpers");
const users = async (req, res) => {
  try {
    const usersDB = await _entity.User.getUsers();
    const users = usersDB.filter(user => user.email !== _env.EMAIL_ADMIN);
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Error: ' + error
    });
  }
};
exports.users = users;
const user = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const user = await _entity.User.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: 'Error getting user, ' + error
    });
  }
};
exports.user = user;
const editUserById = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const {
      password
    } = req.body;
    const pass = await _helpers.passwordHelper.encryptPassword(password);
    const update = await _entity.User.updateUser(userId, pass, 1);
    res.status(200).json(update);
  } catch (error) {
    return res.status(500).json({
      message: 'Error edit user, ' + error
    });
  }
};
exports.editUserById = editUserById;
const toInvalidateUser = async (req, res) => {
  try {
    const {
      userId
    } = req.params;
    const invalidate = await _entity.User.invalidating(userId, 0);
    res.status(200).json(invalidate);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server' + error
    });
  }
};
exports.toInvalidateUser = toInvalidateUser;
const usersByRole = async (req, res) => {
  try {
    const {
      role
    } = req.params;
    const result = await _entity.User.getUsersByRol(role, 1);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.usersByRole = usersByRole;
const getManagersActived = async (req, res) => {
  try {
    const {
      role
    } = req.params;
    if (role === 'manager') {
      const manager = await _entity.Manager.getManagers(1);
      return res.status(200).json(manager);
    }
    if (role === 'economist') {
      const economist = await _entity.Economist.getEconomists(1);
      return res.status(200).json(economist);
    }
    res.status(404).json({
      message: 'Rol invalid'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.getManagersActived = getManagersActived;