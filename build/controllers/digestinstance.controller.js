"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStateById = exports.setDigestInstance = exports.getStatusByIdSubs = exports.getDigestInstances = void 0;
var _entity = require("../models/entity");
const getDigestInstances = async (req, res) => {
  try {
    const result = await _entity.DigestInstance.getInstances();
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.getDigestInstances = getDigestInstances;
const setDigestInstance = async (req, res) => {
  try {
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const {
      abstract
    } = req.body;
    if (abstract.length === 0) return res.status(403).json({
      message: 'Bad request'
    });
    const result = await _entity.DigestInstance.create(id, abstract);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.setDigestInstance = setDigestInstance;
const getStatusByIdSubs = async (req, res) => {
  try {
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const result = await _entity.DigestInstance.getStatusBySubscriber(id);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.getStatusByIdSubs = getStatusByIdSubs;
const updateStateById = async (req, res) => {
  try {
    const {
      instanceId
    } = req.params;
    const result = await _entity.DigestInstance.updateStatusById(instanceId, 1);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
};
exports.updateStateById = updateStateById;