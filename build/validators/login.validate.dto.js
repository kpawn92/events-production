"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateLoginDTO = void 0;
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
var _ajvErrors = _interopRequireDefault(require("ajv-errors"));
var _ajv = _interopRequireDefault(require("ajv"));
var _schema = require("../models/schema");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ajv = new _ajv.default({
  allErrors: true
});
(0, _ajvFormats.default)(ajv, ['email']).addKeyword('kind').addKeyword('modifier');
(0, _ajvErrors.default)(ajv);
const validateLoginSchema = ajv.compile(_schema.LoginSchema);
const validateLoginDTO = (req, res, next) => {
  const isDTOValid = validateLoginSchema(req.body);
  if (!isDTOValid) return res.status(403).json({
    message: ajv.errorsText(validateLoginSchema.errors, {
      separator: `, `
    })
  });
  next();
};
exports.validateLoginDTO = validateLoginDTO;