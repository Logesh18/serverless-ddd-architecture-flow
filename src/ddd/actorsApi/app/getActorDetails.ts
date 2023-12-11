import { ActorDetails, RequestParams } from '../domain/getActorDetails';
import { getActorIdsFromInfra, getActorDetailsByIdFromInfra } from '../infra/getActorDetails';

export const getActorDetailsFromApp = async (params: RequestParams) => {
    try {
        const data: string = await getActorIdsFromInfra(params);
        console.log('data1--->', data);
        const promiseArray: any[] = JSON.parse(data).map((id: string, index: number) =>{
            return new Promise(async (res: any, _rej: any)=>{
                setTimeout(async ()=>{
                    const data: ActorDetails = await getActorDetailsByIdFromInfra(id); 
                    console.log('1--->',data);
                    res(data);
                }, index * 300);
            });
        });

        const result: ActorDetails[] = await Promise.all(promiseArray);
        console.log('result===>', result);
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        }

    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}; 