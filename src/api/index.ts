import { stringify } from 'query-string';
import { flatten } from 'q-flat';
import ky from 'ky';
import { GELT_BANK_API_URL } from '../utilities/constants';
import balanceMockResponsePayload from './balance-mock-response';

export type Balance = {
    id: number;
    name: string;
    balance: number;
};

export type Transaction = {
    id: number;
    accountId: number;
    amount: number;
};
const serverApi = ky.create({
    cache: 'force-cache',
    retry: {
        limit: 5,
    },
    hooks: {
        beforeRequest: [
            // Append proper headers before each request
            (request) => {
                if (
                    process.env.NODE_ENV === 'development' &&
                    request.url.includes('/api/endpoints/get-balance')
                ) {
                    return new Response(JSON.stringify(balanceMockResponsePayload), {
                        status: 200,
                    });
                }
                return request;
            },
        ],
    },
});
const api = {
    get: <T = any>(
        path: string,
        searchParameters?: Record<string, any>,
        headers?: Record<string, any>
    ) =>
        serverApi
            .get(path, { searchParams: stringify(flatten(searchParameters)), headers })
            .json<T>(),
    post: <T = any>(path: string, json: Record<string, any>, headers?: Record<string, any>) =>
        serverApi.post(path, { json, headers }).json<T>(),
    put: <T = any>(path: string, json: Record<string, any>, headers?: Record<string, any>) =>
        serverApi.put(path, { json, headers }).json<T>(),
    patch: <T = any>(path: string, json: Record<string, any>, headers?: Record<string, any>) =>
        serverApi.patch(path, { json, headers }).json<T>(),
    delete: <T = any>(path: string, json: Record<string, any>, headers?: Record<string, any>) =>
        serverApi.delete(path, { json, headers }).json<T>(),
};

export const getBalances = () => api.get<Balance[]>(`${GELT_BANK_API_URL}/get-balance`);
export const getTransactions = (accountId: number) =>
    api.get<Transaction[]>(`${GELT_BANK_API_URL}/get-transactions`, { accountId });

export default serverApi;
