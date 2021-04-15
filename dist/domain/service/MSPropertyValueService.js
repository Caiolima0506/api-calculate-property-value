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
exports.MSPropertyValueService = void 0;
const https = __importStar(require("http"));
const json_config_1 = require("../../config/json.config");
const jsonConfig = new json_config_1.JsonConfig();
class MSPropertyValueService {
    /**
     *
     * @param cep {number} CEP do bairro de campinas
     * @returns {ResClimate}
     */
    CalculatePropertyValue(squareMeters) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.GetValueSquareMeters(squareMeters.Cep).then((resultGetValueSquareMeters) => {
                    return resolve(resultGetValueSquareMeters);
                }).catch((err) => {
                    return reject(err);
                });
            });
        });
    }
    GetValueSquareMeters(cep) {
        return __awaiter(this, void 0, void 0, function* () {
            const Url = (yield jsonConfig.mSPropertyValueConfig()).Url;
            return new Promise((resolve, reject) => {
                https.request(`${Url}/PropertyValue/SquareMeters?cep=${cep}`, (res) => {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', d => data += d);
                    res.on('error', error => {
                        return reject(error);
                    });
                    res.on('end', () => {
                        data = JSON.parse(data);
                        if (res.statusCode === 200) {
                            let result = {
                                Cep: data['Cep'],
                                Value: data['Value']
                            };
                            return resolve(result);
                        }
                        else {
                            return reject(data);
                        }
                    });
                }).end();
            });
        });
    }
}
exports.MSPropertyValueService = MSPropertyValueService;
