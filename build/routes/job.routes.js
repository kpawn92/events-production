"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var jobCtrl = _interopRequireWildcard(require("../controllers/job.controller"));
var _multer = require("../middlewares/multer");
var _authJwt = require("../middlewares/authJwt");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const router = (0, _express.Router)();

// TODO: Gestionar los trabajos aceptado a los eventos
/**
 * @swagger
 *  tags:
 *      name: Job
 *      description: Endpoints para manejar los trabajos a presentar en los eventos
 */

/**
 * @swagger
 *  components:
 *      parameters:
 *          Upload:
 *              in: formData
 *              name: file
 *              type: file
 *              description: Solo se permite formato PDF
 *      schemas:
 *          BodyJobPost:
 *              type: object
 *              properties:
 *                  link_presentation:
 *                      type: string
 *              example:
 *                  link_presentation: http://localhost:4000/docs/
 */

router.post('/upload', [_authJwt.verifyToken, _authJwt.isUser], _multer.multerUpload.single('file'), jobCtrl.uploadFile);

/**
 * @swagger
 *  /job/all:
 *      get:
 *          tags:
 *          - Job
 *          summary: El subscriber obtiene todos los nombres de los trabajos guardados para obtener el link del trabajo
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No se encuentra
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Err server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/all', [_authJwt.verifyToken, _authJwt.isUser], jobCtrl.getJobsBySubs);

/**
 * @swagger
 *  /job/:
 *      get:
 *          tags:
 *          - Job
 *          summary: El manager obtiene todos los trabajos
 *          parameters:
 *          - $ref: '#/components/parameters/token'
 *          responses:
 *              200:
 *                  description: Peticion realizada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              404:
 *                  description: No se encuentra
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *              500:
 *                  description: Err server
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 */

router.get('/', [_authJwt.verifyToken, _authJwt.isManager], jobCtrl.getJobs);
var _default = router;
exports.default = _default;