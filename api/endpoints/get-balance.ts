import { VercelRequest, VercelResponse } from '@vercel/node';
import { getAccounts } from './get-accounts';
import { getTransactions } from './get-transactions';

export type Balance = {
    id: number;
    name: string;
    balance: number;
};

const getBalance = async (): Promise<Balance[]> => {
    const accounts = await getAccounts();

    const transactionPromises = accounts.map(async ({ id, name }) => {
        const transactions = await getTransactions(id);
        const balance = transactions.reduce((accumulator, { amount }) => accumulator + amount, 0);
        return {
            id,
            name,
            balance,
        };
    });
    const transactions = await Promise.all(transactionPromises);

    return transactions.sort((a, b) => b.balance - a.balance);
};

const getBalanceApi = async (_: VercelRequest, response: VercelResponse) => {
    const balance = await getBalance();
    return response.status(200).send(balance);
};

export default getBalanceApi;
