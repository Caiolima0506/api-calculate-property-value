"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpExeption_1 = __importDefault(require("./HttpExeption"));
class ClaculatePropertyValueExeption extends HttpExeption_1.default {
    constructor(msg) {
        super(400, msg);
    }
}
exports.default = ClaculatePropertyValueExeption;