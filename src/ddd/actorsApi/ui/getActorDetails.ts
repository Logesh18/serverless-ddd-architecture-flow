import { getActorDetailsFromApp } from '../app/getActorDetails';
import { RequestParams } from '../domain/getActorDetails';

export const handler = async (event: any) => {
    try {
        const params: RequestParams = event?.queryStringParameters;
        const data = await getActorDetailsFromApp(params);
        console.log('data===>', data);
        return { ...data };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}; 