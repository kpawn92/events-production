"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserByParams = exports.verifySubsByParams = exports.verifyRoleByParams = exports.verifyLivingRoomByParams = exports.verifyInstance = exports.verifyHeaderModeratorOrEconomist = exports.verifyEventByParams = void 0;
var _entity = require("../models/entity");
var _env = require("../config/env");
const verifyUserByParams = async (req, res, next) => {
  const {
    userId
  } = req.params;
  const user = await _entity.User.getUserById(userId);
  if (user.length === 0) return res.status(404).json({
    message: 'User not found'
  });
  next();
};
exports.verifyUserByParams = verifyUserByParams;
const verifyEventByParams = async (req, res, next) => {
  const {
    eventId
  } = req.params;
  const id = await _entity.Event.getById(eventId);
  if (id.length === 0) return res.status(404).json({
    message: 'Event not found'
  });
  next();
};
exports.verifyEventByParams = verifyEventByParams;
const verifyLivingRoomByParams = async (req, res, next) => {
  const {
    livingRoomId
  } = req.params;
  const id = await _entity.LivingRoom.getElementById(livingRoomId);
  if (id.length === 0) return res.status(404).json({
    message: 'Living Room not found'
  });
  next();
};
exports.verifyLivingRoomByParams = verifyLivingRoomByParams;
const verifyHeaderModeratorOrEconomist = async (req, res, next) => {
  try {
    const header = req.headers[_env.KEY_HEADER_MODERATOR];
    if (header !== _env.VOID_KEY_HEADER_MODERATOR) return next();
    const events = await _entity.Event.events();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      message: 'Error server, ' + error
    });
  }
};
exports.verifyHeaderModeratorOrEconomist = verifyHeaderModeratorOrEconomist;
const verifyRoleByParams = async (req, res, next) => {
  try {
    const {
      role
    } = req.params;
    await _entity.Roles.getRoleByName(role);
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Params invalid'
    });
  }
};
exports.verifyRoleByParams = verifyRoleByParams;
const verifySubsByParams = async (req, res, next) => {
  try {
    const {
      subsId
    } = req.params;
    console.log(req.userId);
    const id = await _entity.Subscribers.getSubscriberById(subsId);
    if (id.length === 0) return res.status(404).json({
      message: 'Subscriber not found'
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.verifySubsByParams = verifySubsByParams;
const verifyInstance = async (req, res, next) => {
  try {
    const {
      instanceId
    } = req.params;
    const id = await _entity.DigestInstance.getInstanceById(instanceId);
    if (id.length === 0) return res.status(404).json({
      message: 'Digest Instance not found'
    });
    next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error server: ' + error
    });
  }
};
exports.verifyInstance = verifyInstance;