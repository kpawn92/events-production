"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoles = exports.createAdmin = void 0;
var _entity = require("../models/entity");
var _env = require("../config/env");
var _path = require("path");
const createRoles = async () => {
  try {
    const {
      count
    } = await _entity.Roles.count();
    if (count > 0) return;
    await _entity.Roles.create();
  } catch (error) {
    console.log(error);
  }
};
exports.createRoles = createRoles;
const createAdmin = async () => {
  try {
    const {
      count_users
    } = await _entity.User.setAdmin();
    if (count_users > 0) return;
    await _entity.User.createAdmin(_env.EMAIL_ADMIN, _env.KEY_ADMIN);
  } catch (error) {
    console.log(error);
  }
};
exports.createAdmin = createAdmin;