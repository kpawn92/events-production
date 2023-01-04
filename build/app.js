"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _path = require("path");
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerOptions = require("./libs/swaggerOptions");
var _initialSetup = require("./libs/initialSetup");
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _event = _interopRequireDefault(require("./routes/event.routes"));
var _livingroom = _interopRequireDefault(require("./routes/livingroom.routes"));
var _digestinstance = _interopRequireDefault(require("./routes/digestinstance.routes"));
var _payment = _interopRequireDefault(require("./routes/payment.routes"));
var _job = _interopRequireDefault(require("./routes/job.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Swagger

// Routes

const app = (0, _express.default)();

// Initial Setup #-------------------------------#
exports.app = app;
(0, _initialSetup.createRoles)();
(0, _initialSetup.createAdmin)();
//-----------------------------------------------#

// Middlewares #---------------------------------#
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use('/public', _express.default.static((0, _path.join)(__dirname, '../uploads')));
const specs = (0, _swaggerJsdoc.default)(_swaggerOptions.options);
//-----------------------------------------------#

// Endpoints #-----------------------------------#
// Management users #----------------------------#
app.use('/api/auth/', _auth.default);
app.use('/api/users/', _user.default);
//-----------------------------------------------#

// Management events #---------------------------#
app.use('/api/events/', _event.default);
app.use('/api/living-room/', _livingroom.default);
//-----------------------------------------------#

// Management event participants #---------------#
app.use('/api/digest-instance/', _digestinstance.default);
app.use('/api/payment-instance/', _payment.default);
app.use('/api/job/', _job.default);
//-----------------------------------------------#

// Documentation Endpoints #---------------------------#
app.use('/docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(specs));