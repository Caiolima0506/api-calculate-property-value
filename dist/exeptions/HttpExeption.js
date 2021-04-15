"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.default = HttpException;
