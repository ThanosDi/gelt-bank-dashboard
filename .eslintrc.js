module.exports = {
    plugins: [],
    overrides: [],
    parser: 'babel-eslint',
    ignorePatterns: ['build', 'coverage', 'dist', 'react-app-env.d.ts'],
    rules: {
        camelcase: 'off',
        'unicorn/prefer-export-from': 'off',
        // your overrides
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
