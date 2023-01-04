"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = exports.signIn = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _entity = require("../models/entity");
var _env = require("../config/env");
var _helpers = require("../helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const signUp = async (req, res) => {
  try {
    const {
      role
    } = req.body;
    if (role) {
      if (role === 'moderator') {
        const moderator = await _helpers.userHelper.createAdvancedUser(req.body, _entity.Moderator);
        if (!moderator) return res.status(400).json({
          message: 'Moderator already exists'
        });
        return res.status(200).json(moderator);
      }
      if (role === 'manager') {
        const manager = await _helpers.userHelper.createAdvancedUser(req.body, _entity.Manager);
        if (!manager) return res.status(400).json({
          message: 'Manager already exists'
        });
        return res.status(200).json(manager);
      }
      if (role === 'economist') {
        const economist = await _helpers.userHelper.createAdvancedUser(req.body, _entity.Economist);
        if (!economist) return res.status(400).json({
          message: 'Economist already exists'
        });
        return res.status(200).json(economist);
      }
    }
    const subscriber = await _helpers.userHelper.createAdvancedUser(req.body, _entity.Subscribers);
    if (!subscriber) res.status(404).json({
      message: 'Subscriber already exists'
    });
    res.status(200).json(subscriber);
  } catch (error) {
    return res.status(500).json({
      message: 'Error controller: ' + error
    });
  }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const email_user = await _entity.User.getUserByEmail(email);
    if (!email_user) return res.status(403).json({
      message: 'Invalid user'
    });
    const {
      pass_user,
      id
    } = email_user; // Destructuring function getUserByEmail()

    const mathPassword = await _helpers.passwordHelper.comparePassword(password, pass_user);
    if (!mathPassword) return res.status(401).json({
      token: null,
      message: 'Invalid password'
    });
    const token = _jsonwebtoken.default.sign({
      id
    }, _env.KEY_SECRET, {
      expiresIn: 86400 // 24h valid
    });

    res.json({
      token
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.signIn = signIn;