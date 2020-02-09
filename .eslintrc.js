process.env.STUB = 'false'
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parser: 'babel-eslint',
    plugins: [
        'react',
        'import'
    ],
    env: {
        browser: true,
        node: true,
    },
    globals: {
        browser: true,
    }
}
