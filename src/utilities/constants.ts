export const GELT_BANK_API_URL =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/endpoints'
        : 'https://gelt-bank-dashboard.vercel.app/api/endpoints';
