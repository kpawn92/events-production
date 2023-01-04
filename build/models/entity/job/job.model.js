"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobsBySubs = exports.jobs = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (fk_subscriber, name) => {
  const id = (0, _uuid.v4)();
  const [result] = await _db.pool.query('INSERT INTO job SET ?', {
    id,
    fk_subscriber,
    name
  });
  return result;
};
exports.create = create;
const jobsBySubs = async fk_subscriber => {
  const [result] = await _db.pool.query('SELECT name FROM job WHERE fk_subscriber = ?', [fk_subscriber]);
  return result;
};
exports.jobsBySubs = jobsBySubs;
const jobs = async () => {
  const [result] = await _db.pool.query('SELECT * FROM job');
  return result;
};
exports.jobs = jobs;