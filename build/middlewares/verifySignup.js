"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyData = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _env = require("../config/env");
var _moderatorValidator = require("../validators/moderator.validator.dto");
var _subscriberValidate = require("../validators/subscriber.validate.dto");
var _entity = require("../models/entity");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const verifyHeaders = async (header, key, void_key, id) => {
  const headerUserAdvanced = header[key];
  if (headerUserAdvanced !== void_key) return;
  const role = await _entity.User.getRolById(id);
  if (!role) return;
  const rol_name = role.rol_name;
  return rol_name;
};
const verifyData = async (req, res, next) => {
  try {
    const {
      role
    } = req.body;
    if (role) {
      const token = req.headers[_env.KEY_TOKEN_HEADER];
      if (!token) return res.status(404).json({
        message: 'Token not found'
      });
      const decoded = _jsonwebtoken.default.verify(token, _env.KEY_SECRET);
      if (role === 'moderator' || role === 'economist') {
        const rol_name = await verifyHeaders(req.headers, _env.KEY_HEADER_ADMIN, _env.VOID_KEY_HEADER_ADMIN, decoded.id);
        if (!rol_name) return res.status(404).json({
          message: 'Header not found'
        });
        if (rol_name !== 'admin') return res.status(401).json({
          message: 'Unauthorized'
        });
      }
      if (role === 'manager') {
        const rol_name = await verifyHeaders(req.headers, _env.KEY_HEADER_MODERATOR, _env.VOID_KEY_HEADER_MODERATOR, decoded.id);
        if (!rol_name) return res.status(404).json({
          message: 'Header not found'
        });
        if (rol_name !== 'moderator') return res.status(401).json({
          message: 'Unauthorized'
        });
      }
      return (0, _moderatorValidator.validateModeratorDTO)(req, res, next);
    }
    return (0, _subscriberValidate.validateSubscriberDTO)(req, res, next);
  } catch (error) {
    return res.status(500).json({
      message: 'Error body: ' + error
    });
  }
};
exports.verifyData = verifyData;