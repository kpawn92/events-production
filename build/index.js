"use strict";

var _env = require("./config/env");
var _app = require("./app");
_app.app.listen(_env.PORT);
console.log(`Server listening on host: ${_env.HOSTING}\n`, `Documentation API-REST: ${_env.HOST_DOCS}`);