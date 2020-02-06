process.env.STUB = 'false'
module.exports = {
    parser: 'babel-eslint',
    plugins: [
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
