import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const TRANSACTIONS_URL = 'https://bankapi.gelt.finance/transactions';

type Transaction = {
    id: number;
    accountId: number;
    amount: number;
};

export const getTransactions = async (accountId: number, retries = 0): Promise<Transaction[]> => {
    if (retries > 10) {
        throw new Error('Failed, sorry!');
    }

    try {
        const transactions = await axios
            .get(`${TRANSACTIONS_URL}/${accountId}`)
            .then(({ data }) => data);

        return transactions;
    } catch {
        return getTransactions(accountId, retries + 1);
    }
};

const getTransactionsApi = async (request: VercelRequest, response: VercelResponse) => {
    const { accountId } = request.query;

    if (!accountId || typeof accountId !== 'string') {
        return response.status(400).send('You need to provide an accountId as a query param.');
    }
    // Cast accountId to number before getting a transaction.
    const transactions = await getTransactions(Number.parseInt(accountId, 10));
    return response.status(200).send(transactions);
};

export default getTransactionsApi;
