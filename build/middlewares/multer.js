"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerUpload = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _path = require("path");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MIMETYPE = ['application/pdf'];
const multerUpload = (0, _multer.default)({
  storage: _multer.default.diskStorage({
    destination: (0, _path.join)(__dirname, '../../uploads'),
    filename: (req, file, cb) => {
      const fileExtension = (0, _path.extname)(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      cb(null, `${fileName.replace(/ /g, '') /** <=> quitar los espacios */}-${Date.now()}${fileExtension}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPE.includes(file.mimetype)) cb(null, true);else cb(new Error(`Only ${MIMETYPE.join('')} mimetype not supported`));
  },
  limits: {
    fieldSize: 10000000
  }
});
exports.multerUpload = multerUpload;