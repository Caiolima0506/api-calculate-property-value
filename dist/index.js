"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../src/swagger.json"));
const CalculatePropertyValueController_1 = require("./controllers/CalculatePropertyValueController");
var ExitStatus;
(function (ExitStatus) {
    ExitStatus[ExitStatus["Failure"] = 1] = "Failure";
    ExitStatus[ExitStatus["Success"] = 0] = "Success";
})(ExitStatus || (ExitStatus = {}));
const app = express_1.default();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Rotas para Controllers
 */
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/CalculatePropertyValue', CalculatePropertyValueController_1.CalculatePropertyValueController);
process.on('unhandledRejection', (reason, promise) => {
    throw reason;
});
process.on('uncaughtException', (error) => {
    process.exit(ExitStatus.Failure);
});
const port = process.env.PORT || 3002;
exports.Server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
