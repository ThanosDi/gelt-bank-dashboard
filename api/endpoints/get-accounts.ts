import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const ACCOUNTS_URL = 'https://bankapi.gelt.finance/accounts';

type Account = {
    id: number;
    name: string;
};

export const getAccounts = async () => {
    const accounts: Account[] = await axios.get(ACCOUNTS_URL).then(({ data }) => data);
    return accounts;
};

const getAccountsApi = async (_: VercelRequest, response: VercelResponse) => {
    const accounts = await getAccounts();
    return response.status(200).send(accounts);
};

export default getAccountsApi;
