"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePropertyValueController = void 0;
const express_1 = require("express");
const CalculatePropertyValueService_1 = require("../domain/service/CalculatePropertyValueService");
const express_validator_1 = require("express-validator");
const router = express_1.Router();
const calculatePropertyValueService = new CalculatePropertyValueService_1.CalculatePropertyValueService();
router.get('/', express_validator_1.query('cep').isNumeric(), express_validator_1.query('squareMeters').isNumeric(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schemaErrors = express_validator_1.validationResult(req);
    if (!schemaErrors.isEmpty()) {
        return res.status(403).send(schemaErrors.array());
    }
    let cep = Number(req.query.cep);
    let squareMeters = Number(req.query.squareMeters);
    calculatePropertyValueService.CalculatePropertyValue(cep, squareMeters).then((result) => {
        return res.status(200).send(result);
    }).catch((err) => {
        if (err && err.status) {
            return res.status(err.status).send({ msg: err.message });
        }
        else {
            return res.status(500);
        }
    });
}));
exports.CalculatePropertyValueController = router;
