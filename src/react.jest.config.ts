import type { Config } from '@jest/types';

export default {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./setup-tests.ts'],
    transformIgnorePatterns: ['/node_modules/(?!(ky))'],
    moduleNameMapper: {
        '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/file-mock.ts',
        '\\.(css|less)$': '<rootDir>/__mocks__/file-mock.ts',
    },
    testTimeout: 60_000,
} as Config.InitialOptions;
