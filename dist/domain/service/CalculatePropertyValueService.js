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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculatePropertyValueService = void 0;
const ClaculatePropertyValueExeption_1 = __importDefault(require("../../exeptions/ClaculatePropertyValueExeption"));
const MSPropertyValueService_1 = require("./MSPropertyValueService");
const _mSPropertyValueService = new MSPropertyValueService_1.MSPropertyValueService();
class CalculatePropertyValueService {
    CalculatePropertyValue(cep, squareMeters) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.Validate(squareMeters);
            return new Promise((resolve, reject) => {
                let querySquareMeters = {
                    Cep: cep,
                    SquareMeters: squareMeters
                };
                _mSPropertyValueService.CalculatePropertyValue(querySquareMeters).then((result) => __awaiter(this, void 0, void 0, function* () {
                    let valueCalculated = yield this.Calculate(squareMeters, result.Value);
                    let res = {
                        Cep: cep,
                        PropertyValue: valueCalculated
                    };
                    resolve(res);
                })).catch((err) => {
                    reject(err);
                });
            });
        });
    }
    Validate(squareMeters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (squareMeters < 10) {
                throw new ClaculatePropertyValueExeption_1.default("A quantidade de metros quadrados não pode ser menor que 10!");
            }
            if (squareMeters > 10000) {
                throw new ClaculatePropertyValueExeption_1.default("A quantidade de metros quadrados não pode ser maior que 10.000!");
            }
        });
    }
    Calculate(squareMeters, valueSquareMeter) {
        return __awaiter(this, void 0, void 0, function* () {
            return (squareMeters * valueSquareMeter);
        });
    }
}
exports.CalculatePropertyValueService = CalculatePropertyValueService;
