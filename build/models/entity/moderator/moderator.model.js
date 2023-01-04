"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUser = exports.getModerators = exports.create = void 0;
var _uuid = require("uuid");
var _db = require("../../../config/db");
const create = async (id, body) => {
  const _id = (0, _uuid.v4)();
  const {
    name,
    lastname,
    dni
  } = body;
  const [moderator] = await _db.pool.query('INSERT INTO moderator SET ?', {
    id: _id,
    name,
    lastname,
    dni,
    fk_user: id
  });
  return moderator;
};
exports.create = create;
const setUser = async dni => {
  const [result] = await _db.pool.query('SELECT dni FROM moderator WHERE dni = ?', [dni]);
  return result;
};
exports.setUser = setUser;
const getModerators = async status => {
  const [result] = await _db.pool.query('SELECT name, lastname, dni, email FROM moderator JOIN users ON users.id = fk_user WHERE status = ?', [status]);
  return result;
};
exports.getModerators = getModerators;