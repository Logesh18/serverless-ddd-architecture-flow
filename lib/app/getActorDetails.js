"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActorDetailsFromApp = void 0;
const getActorDetails_1 = require("../infra/getActorDetails");
const getActorDetailsFromApp = async (params) => {
    try {
        const data = await (0, getActorDetails_1.getActorIdsFromInfra)(params);
        console.log('data1--->', data);
        const promiseArray = JSON.parse(data).map((id, index) => {
            return new Promise(async (res, _rej) => {
                setTimeout(async () => {
                    const data = await (0, getActorDetails_1.getActorDetailsByIdFromInfra)(id);
                    console.log('1--->', data);
                    res(data);
                }, index * 300);
            });
        });
        const result = await Promise.all(promiseArray);
        console.log('result===>', result);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
exports.getActorDetailsFromApp = getActorDetailsFromApp;
//# sourceMappingURL=getActorDetails.js.map