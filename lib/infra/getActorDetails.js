"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActorDetailsByIdFromInfra = exports.getActorIdsFromInfra = void 0;
const axios_1 = __importDefault(require("axios"));
const configuration_1 = require("../config/configuration");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getApi = async (method, url, params) => {
    const options = {
        method,
        url: configuration_1.configVariables.API_URL + url,
        params,
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    };
    return await axios_1.default.request(options);
};
const getActorIdsFromInfra = async (params) => {
    const { limit, ...param } = { ...params };
    try {
        const response = await getApi('GET', '/actors/list-born-today', param);
        let data = response.data
            .slice(0, limit)
            .map((actorId) => actorId
            .replace('/name/', '')
            .replace('/', ''));
        console.log('data111---->', data);
        return JSON.stringify(data);
    }
    catch (error) {
        return JSON.stringify(error);
    }
};
exports.getActorIdsFromInfra = getActorIdsFromInfra;
const getActorDetailsByIdFromInfra = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const response = await getApi('GET', '/actors/get-bio', {
                nconst: id
            });
            let resp = {
                id,
                image: response.data.image.url ?? 'No image',
                name: response.data.name,
                dob: response.data.birthDate,
                birthPlace: response.data.birthPlace,
                gender: response.data.gender,
                height: response.data.heightCentimeters ? `${response.data.heightCentimeters} cm` : '-',
                description: response.data.miniBios[0].text
            };
            res(resp);
        }
        catch (error) {
            rej({ id, msg: `No data Found` });
        }
    });
};
exports.getActorDetailsByIdFromInfra = getActorDetailsByIdFromInfra;
//# sourceMappingURL=getActorDetails.js.map