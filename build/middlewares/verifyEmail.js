"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserAndEmailById = exports.verifyEmail = void 0;
var _entity = require("../models/entity");
const verifyRole = async (req, res, next) => {
  try {
    const {
      role
    } = req.body;
    if (role) await _entity.Roles.getRoleByName(role);
    next();
  } catch (error) {
    return res.status(404).json({
      message: 'Error getting role: (invalid), ' + error
    });
  }
};
const verifyEmail = async (req, res, next) => {
  const {
    email
  } = req.body;
  const _email = await _entity.User.getEmailByEmail(email);
  if (_email.length > 0) return res.status(404).json({
    message: 'Email already exists'
  });
  await verifyRole(req, res, next);
};
exports.verifyEmail = verifyEmail;
const verifyUserAndEmailById = async (req, res, next) => {
  const {
    userId
  } = req.params;
  const {
    email,
    password
  } = req.body;
  if (password.length === 0) return res.status(403).json({
    message: 'Password invalid'
  });
  const users = await _entity.User.getUserById(userId);
  if (users.length === 0) return res.status(404).json({
    message: 'User not found'
  });
  const emailIndex = users.findIndex(user => user.email === email);
  if (emailIndex === -1) return res.status(403).json({
    message: 'Email invalid'
  });
  next();
};
exports.verifyUserAndEmailById = verifyUserAndEmailById;