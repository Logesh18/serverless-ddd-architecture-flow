import dotenv from 'dotenv';
dotenv.config();

export const configVariables = {
    API_URL: `https://${process.env.API_HOST}`,
}