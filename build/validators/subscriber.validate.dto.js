"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSubscriberDTO = void 0;
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
const validateSubscriberSchema = ajv.compile(_schema.SubscriberSchema);
const validateSubscriberDTO = (req, res, next) => {
  const isDTOValid = validateSubscriberSchema(req.body);
  if (!isDTOValid) return res.status(403).json({
    message: ajv.errorsText(validateSubscriberSchema.errors, {
      separator: `, `
    })
  });
  next();
};
exports.validateSubscriberDTO = validateSubscriberDTO;