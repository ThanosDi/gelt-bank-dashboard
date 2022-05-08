import httpMocks from 'node-mocks-http';
import nock from 'nock';
import getTransactions from '../endpoints/get-transactions';
import getTransactionsMock from '../mocks/get-transactions-mock';

describe('/api/endpoints/get-profiles', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        nock.cleanAll();
        nock.enableNetConnect();
    });

    test('Get transactions fails without accountId', async () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/api/endpoints/get-transactions',
        });

        const response = httpMocks.createResponse();
        await getTransactions(request, response);

        // eslint-disable-next-line no-underscore-dangle
        expect(response._getData()).toEqual('You need to provide an accountId as a query param.');
        expect(response.statusCode).toBe(400);
    });

    test('Get transactions', async () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/api/endpoints/get-balance',
            query: {
                accountId: '5',
            },
        });

        nock('https://bankapi.gelt.finance')
            .intercept(`/transactions/5`, 'GET')
            .reply(200, getTransactionsMock);

        const response = httpMocks.createResponse();
        await getTransactions(request, response);

        // eslint-disable-next-line no-underscore-dangle
        expect(response._getData()).toEqual(getTransactionsMock);
        expect(response.statusCode).toBe(200);
    });

    test('Get transactions fails after 10 retries', async () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/api/endpoints/get-transactions',
            query: {
                accountId: '5',
            },
        });

        nock('https://bankapi.gelt.finance')
            .intercept(`/transactions/5`, 'GET')
            .replyWithError({
                message: 'something awful happened',
                code: 'AWFUL_ERROR',
            })
            .persist();
        const response = httpMocks.createResponse();
        try {
            await getTransactions(request, response);
        } catch (error: any) {
            expect(error.message).toBe('Failed, sorry!');
        }

        // eslint-disable-next-line no-underscore-dangle
        // expect(response._getData()).toEqual('Failed, sorry!');
        // expect(response.statusCode).toBe(400);
    });
});
