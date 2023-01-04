"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.isUser = exports.isModelator = exports.isManager = exports.isEconomist = exports.isAdmin = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _env = require("../config/env");
var _entity = require("../models/entity");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers[_env.KEY_TOKEN_HEADER];
    if (!token) return res.status(403).json({
      message: 'No token provided'
    });
    const decoded = _jsonwebtoken.default.verify(token, _env.KEY_SECRET);
    req.userId = decoded.id;
    const rol_token = await _entity.User.getRolById(decoded.id);
    if (!rol_token) return res.status(404).json({
      message: 'Expired token'
    });
    const {
      rol_name
    } = rol_token;
    req.userRol = rol_name;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized, ' + error
    });
  }
};
exports.verifyToken = verifyToken;
const isUser = async (req, res, next) => {
  if (req.userRol === 'user') return next();
  return res.status(403).json({
    message: 'Require User role'
  });
};
exports.isUser = isUser;
const isModelator = async (req, res, next) => {
  if (req.userRol === 'moderator') return next();
  return res.status(403).json({
    message: 'Require Moderator role'
  });
};
exports.isModelator = isModelator;
const isAdmin = (req, res, next) => {
  console.log(req.userId);
  if (req.userRol === 'admin') return next();
  return res.status(403).json({
    message: 'Requer Admin role'
  });
};
exports.isAdmin = isAdmin;
const isEconomist = (req, res, next) => {
  if (req.userRol === 'economist') return next();
  return res.status(403).json({
    message: 'Requer economist role'
  });
};
exports.isEconomist = isEconomist;
const isManager = (req, res, next) => {
  if (req.userRol === 'manager') return next();
  return res.status(403).json({
    message: 'Requer manager role'
  });
};
exports.isManager = isManager;