import { VercelRequest, VercelResponse } from '@vercel/node';

const getAppStatus = async (_: VercelRequest, response: VercelResponse) => {
    return response.status(200).send({ message: 'OK' });
};

export default getAppStatus;
