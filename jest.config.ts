import type { Config } from '@jest/types';

export default {
    projects: ['api/api.jest.config.ts', 'src/react.jest.config.ts'],
    // preset: 'ts-jest',
    testTimeout: 60_000,
} as Config.InitialOptions;
