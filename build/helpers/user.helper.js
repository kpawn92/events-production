"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAdvancedUser = void 0;
var _entity = require("../models/entity");
const createUser = async (role = 'user', email, password) => {
  const id = await _entity.Roles.getRoleByName(role);
  const user = await _entity.User.create(id, email, password);
  return user;
};
const createAdvancedUser = async (body, Modelo) => {
  const {
    email,
    password,
    role,
    dni
  } = body;
  const setUserModel = await Modelo.setUser(dni);
  if (setUserModel.length > 0) return;
  const {
    user,
    _id
  } = await createUser(role, email, password);
  const modelCreated = await Modelo.create(_id, body);
  return {
    user,
    modelCreated
  };
};
exports.createAdvancedUser = createAdvancedUser;