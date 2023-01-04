"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptPassword = exports.comparePassword = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const encryptPassword = async password => {
  const salt = await _bcryptjs.default.genSalt(10); // aplica un algoritmo de cifrado
  return await _bcryptjs.default.hash(password, salt);
};
exports.encryptPassword = encryptPassword;
const comparePassword = async (password, receivedPassword) => {
  return await _bcryptjs.default.compare(password, receivedPassword);
};
exports.comparePassword = comparePassword;