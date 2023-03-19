module.exports={
    parser: '@typescript-eslint/parser',
    extends: ['handlebarlabs'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off', // allow implicit return types for functions
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // ignore unused variables starting with underscore
      'react/jsx-props-no-spreading': 'off', // allow spreading props in JSX
      'react/jsx-curly-newline': 'off', // allow multiple lines inside JSX curly braces
      'react/style-prop-object': 'off', // allow style prop to be an object
    },
}

