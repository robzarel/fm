module.exports = {
    verbose: true,
    testRegex: 'src/.*-test\\.jsx?$',
    modulePaths: [
        'node_modules/'
    ],
    moduleDirectories: [
        'node_modules/'
    ],
    moduleNameMapper: {
        '\\.(css)$': '<rootDir>/mocks/style-mock.js'
    },
    unmockedModulePathPatterns: [
        '<rootDir>/node_modules/react',
        '<rootDir>/node_modules/react-dom'
    ]
};
