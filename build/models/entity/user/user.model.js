"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.setAdmin = exports.invalidating = exports.getUsersByRol = exports.getUsers = exports.getUserById = exports.getUserByEmail = exports.getRolById = exports.getEmailByEmail = exports.createAdmin = exports.create = void 0;
var _db = require("../../../config/db");
var _uuid = require("uuid");
var _roles = require("../roles/roles.model");
var _helpers = require("../../../helpers");
const setAdmin = async () => {
  const [result] = await _db.pool.query('SELECT COUNT(id) as count_users FROM users');
  return result[0];
};
exports.setAdmin = setAdmin;
const createAdmin = async (email, password) => {
  const _id = (0, _uuid.v4)();
  await _db.pool.query('INSERT INTO users SET ?', {
    id: _id,
    email,
    password: await _helpers.passwordHelper.encryptPassword(password),
    rol: await (0, _roles.getRoleByName)('admin')
  });
};
exports.createAdmin = createAdmin;
const getUserByEmail = async email => {
  const [result] = await _db.pool.query(`SELECT id, email as email_user, password as pass_user FROM users WHERE email = ? AND status = '1'`, [email]);
  return result[0];
};
exports.getUserByEmail = getUserByEmail;
const getEmailByEmail = async email => {
  const [result] = await _db.pool.query('SELECT email as _email FROM users WHERE email = ?', [email]);
  return result;
};
exports.getEmailByEmail = getEmailByEmail;
const create = async (id, email, password) => {
  const _id = (0, _uuid.v4)();
  const [user] = await _db.pool.query('INSERT INTO users SET ?', {
    id: _id,
    email,
    password: await _helpers.passwordHelper.encryptPassword(password),
    rol: id
  });
  return {
    user,
    _id
  };
};
exports.create = create;
const getRolById = async id => {
  const [rol] = await _db.pool.query('SELECT rol_name FROM users JOIN roles ON roles.id = users.rol WHERE users.id = ?', [id]);
  return rol[0];
};
exports.getRolById = getRolById;
const getUsers = async () => {
  const [result] = await _db.pool.query('SELECT users.id, email, rol_name, status FROM users JOIN roles ON roles.id = users.rol');
  return result;
};
exports.getUsers = getUsers;
const getUserById = async id => {
  const [result] = await _db.pool.query('SELECT users.id, email, rol_name, status FROM users JOIN roles ON roles.id = users.rol WHERE users.id = ?', [id]);
  return result;
};
exports.getUserById = getUserById;
const updateUser = async (id, password, status) => {
  const [result] = await _db.pool.query('UPDATE users SET password = ?, `status` = ? WHERE id = ?', [password, status, id]);
  return result;
};
exports.updateUser = updateUser;
const invalidating = async (id, status) => {
  const [result] = await _db.pool.query('UPDATE users SET `status` = ? WHERE id = ?', [status, id]);
  return result;
};

// El admin obtiene los usuarios activos por rol tambien
exports.invalidating = invalidating;
const getUsersByRol = async (role_name, status) => {
  if (role_name !== 'user') {
    const [result] = await _db.pool.query(`SELECT ${role_name}.id, ${role_name}.name, ${role_name}.lastname, ${role_name}.dni, email, ${role_name}.createdAt FROM ${role_name} JOIN users ON users.id = ${role_name}.fk_user WHERE status = ?`, [status]);
    return result;
  }
  const [result] = await _db.pool.query('SELECT subscriber.id, subscriber.name, subscriber.lastname, subscriber.dni, institution, nation, category, email FROM subscriber JOIN users ON users.id = subscriber.fk_user JOIN roles ON roles.id = users.rol WHERE users.status = ? AND rol_name = ?', [status, role_name]);
  return result;
};
exports.getUsersByRol = getUsersByRol;