"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheInit = void 0;
var _expressExpeditious = _interopRequireDefault(require("express-expeditious"));
var _expeditiousEngineMemory = _interopRequireDefault(require("expeditious-engine-memory"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const defaultOptions = {
  namespace: 'expresscache',
  engine: (0, _expeditiousEngineMemory.default)(),
  defaultTtl: '5 minute',
  statusCodeExpires: {
    404: '5 minutes',
    500: 0
  }
};
const cacheInit = (0, _expressExpeditious.default)(defaultOptions);
exports.cacheInit = cacheInit;