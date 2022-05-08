import httpMocks from 'node-mocks-http';
import nock from 'nock';
import getAccounts from '../endpoints/get-accounts';
import getAccountsMock from '../mocks/get-accounts-mock';

describe('/api/endpoints/get-profiles', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        nock.cleanAll();
        nock.enableNetConnect();
    });
    test('Get accounts', async () => {
        const request = httpMocks.createRequest({
            method: 'GET',
            url: '/api/endpoints/get-accounts',
        });

        nock('https://bankapi.gelt.finance')
            .intercept(`/accounts`, 'GET')
            .reply(200, getAccountsMock);

        const response = httpMocks.createResponse();
        await getAccounts(request, response);

        // eslint-disable-next-line no-underscore-dangle
        expect(response._getData()).toEqual(getAccountsMock);
        expect(response.statusCode).toBe(200);
    });
});
