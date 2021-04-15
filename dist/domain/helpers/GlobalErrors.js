"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingInternalError = void 0;
const InternalErrors_1 = require("./InternalErrors");
class ProcessingInternalError extends InternalErrors_1.InternalError {
    constructor(message) {
        super(`Unexpected error during  processing: ${message}`);
    }
}
exports.ProcessingInternalError = ProcessingInternalError;
