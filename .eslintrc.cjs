module.exports = {
    env: {
        browser: true,
        es2021: true,
        commonjs: true
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],
        'react/prop-types': 'off'
    }
}
