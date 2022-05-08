module.exports = {
    babel: {
        plugins: [
            [
                'import',
                {
                    libraryName: '@mui/icons-material',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                },
                'icons',
            ],
            [
                'import',
                {
                    libraryName: '@mui/lab',
                    libraryDirectory: '',
                    camel2DashComponentName: false,
                },
                'lab',
            ],
        ],
    },
    eslint: {
        enable: false,
    },
};
