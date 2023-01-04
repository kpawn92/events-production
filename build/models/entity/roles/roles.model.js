"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoles = exports.getRoleByName = exports.create = exports.count = void 0;
var _db = require("../../../config/db");
const create = async () => {
  const admin = _db.pool.query(`INSERT INTO roles VALUES(rol_name, 'admin')`);
  const moderator = _db.pool.query(`INSERT INTO roles VALUES(rol_name, 'moderator')`);
  const manager = _db.pool.query(`INSERT INTO roles VALUES(rol_name, 'manager')`);
  const user = _db.pool.query(`INSERT INTO roles VALUES(rol_name, 'user')`);
  const economist = _db.pool.query(`INSERT INTO roles VALUES(rol_name, 'economist')`);
  await Promise.all([admin, moderator, manager, economist, user]);
};
exports.create = create;
const getRoleByName = async name => {
  const [rol] = await _db.pool.query('SELECT id FROM roles WHERE rol_name = ?', [name]);
  const id = rol[0]['id'];
  return id;
};
exports.getRoleByName = getRoleByName;
const count = async () => {
  const [result] = await _db.pool.query('SELECT COUNT(id) as count FROM roles');
  return result[0];
};
exports.count = count;
const getRoles = async () => {
  const [result] = await _db.pool.query('SELECT rol_name FROM roles');
  return result;
};
exports.getRoles = getRoles;