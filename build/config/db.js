"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pool = void 0;
var _promise = require("mysql2/promise");
var _env = require("./env");
const pool = (0, _promise.createPool)({
  host: _env.HOST,
  user: _env.USER,
  password: _env.PASSWORD,
  port: _env.PORT_MYSQL,
  database: _env.DATABASE
});
exports.pool = pool;