"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VOID_KEY_HEADER_MODERATOR = exports.VOID_KEY_HEADER_ADMIN = exports.USER = exports.PORT_MYSQL = exports.PORT = exports.PASSWORD = exports.KEY_TOKEN_HEADER = exports.KEY_SECRET = exports.KEY_HEADER_MODERATOR = exports.KEY_HEADER_ADMIN = exports.KEY_ADMIN = exports.HOST_DOCS = exports.HOSTING = exports.HOST = exports.EMAIL_ADMIN = exports.DATABASE = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
const {
  PORT,
  PORT_MYSQL,
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  KEY_SECRET,
  KEY_ADMIN,
  EMAIL_ADMIN,
  KEY_HEADER_ADMIN,
  VOID_KEY_HEADER_ADMIN,
  KEY_HEADER_MODERATOR,
  VOID_KEY_HEADER_MODERATOR,
  KEY_TOKEN_HEADER,
  HOSTING,
  HOST_DOCS
} = process.env;
exports.HOST_DOCS = HOST_DOCS;
exports.HOSTING = HOSTING;
exports.KEY_TOKEN_HEADER = KEY_TOKEN_HEADER;
exports.VOID_KEY_HEADER_MODERATOR = VOID_KEY_HEADER_MODERATOR;
exports.KEY_HEADER_MODERATOR = KEY_HEADER_MODERATOR;
exports.VOID_KEY_HEADER_ADMIN = VOID_KEY_HEADER_ADMIN;
exports.KEY_HEADER_ADMIN = KEY_HEADER_ADMIN;
exports.EMAIL_ADMIN = EMAIL_ADMIN;
exports.KEY_ADMIN = KEY_ADMIN;
exports.KEY_SECRET = KEY_SECRET;
exports.DATABASE = DATABASE;
exports.PASSWORD = PASSWORD;
exports.USER = USER;
exports.HOST = HOST;
exports.PORT_MYSQL = PORT_MYSQL;
exports.PORT = PORT;