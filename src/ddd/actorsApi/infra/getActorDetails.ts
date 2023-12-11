import axios from "axios";
import { configVariables } from "../config/configuration"
import { ActorDetails, RequestParams } from "../domain/getActorDetails";
import dotenv from 'dotenv';
dotenv.config();

const getApi = async (method: string, url: string, params: any) => {
    const options: any = {
        method,
        url: configVariables.API_URL + url,
        params,
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST
        }
    };
    return await axios.request(options);
};

export const getActorIdsFromInfra = async (params: RequestParams) => {
    const { limit, ...param} = { ...params }

    try {
        const response = await getApi('GET', '/actors/list-born-today', param);

        let data: string[] = response.data
                            .slice(0,limit)
                            .map((actorId: string) => actorId
                                .replace('/name/', '')
                                .replace('/', '')
                            );
        console.log('data111---->', data);
        return JSON.stringify(data);
    } catch (error) {
        return  JSON.stringify(error);
    }
};

export const getActorDetailsByIdFromInfra = (id: string): Promise<any> => {
    return new Promise(async (res, rej) => {
        try {
            const response = await getApi('GET', '/actors/get-bio', {
                nconst: id
            });
            let resp: ActorDetails = {
                id,
                image: response.data.image.url ?? 'No image',
                name: response.data.name,
                dob: response.data.birthDate,
                birthPlace: response.data.birthPlace,
                gender: response.data.gender,
                height: response.data.heightCentimeters ? `${response.data.heightCentimeters} cm` : '-',
                description: response.data.miniBios[0].text
            } 
            res(resp);
        } catch (error) {
            rej({id, msg:`No data Found`})
        }
    });
}