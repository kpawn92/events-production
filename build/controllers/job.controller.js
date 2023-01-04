"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.getJobsBySubs = exports.getJobs = void 0;
var _entity = require("../models/entity");
const uploadFile = async (req, res) => {
  try {
    const {
      filename
    } = req.file;
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const result = await _entity.Job.create(id, filename);
    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
};
exports.uploadFile = uploadFile;
const getJobsBySubs = async (req, res) => {
  try {
    const {
      id
    } = await _entity.Subscribers.getIdByFkUser(req.userId);
    const result = await _entity.Job.jobsBySubs(id);
    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
};
exports.getJobsBySubs = getJobsBySubs;
const getJobs = async (req, res) => {
  try {
    const result = await _entity.Job.jobs();
    res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
};
exports.getJobs = getJobs;