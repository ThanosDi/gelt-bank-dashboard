import httpMocks from 'node-mocks-http';
import nock from 'nock';
import getBalance from '../endpoints/get-balance';
import getTranasactionsMock from '../mocks/get-transactions-mock';
import getBalanceMock from '../mocks/get-balance-mock';
import getAccountsMock from '../mocks/get-accounts-mock';

describe('/api/endpoints/get-profiles', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        nock.cleanAll();
        nock.enableNetConnect();
    });

    test('Get transactions', async () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/api/endpoints/get-balance',
        });

        nock('https://bankapi.gelt.finance')
            .get((uri) => uri.includes('/transactions/'))
            .reply(200, getTranasactionsMock)
            .persist();

        nock('https://bankapi.gelt.finance')
            .intercept(`/accounts`, 'GET')
            .reply(200, getAccountsMock);

        const response = httpMocks.createResponse();
        await getBalance(request, response);

        // eslint-disable-next-line no-underscore-dangle
        expect(response._getData()).toEqual(getBalanceMock);
        expect(response.statusCode).toBe(200);
    });
});
