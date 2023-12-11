"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const getActorDetails_1 = require("../app/getActorDetails");
const handler = async (event) => {
    try {
        const params = event?.queryStringParameters;
        const data = await (0, getActorDetails_1.getActorDetailsFromApp)(params);
        console.log('data===>', data);
        return { ...data };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=getActorDetails.js.map