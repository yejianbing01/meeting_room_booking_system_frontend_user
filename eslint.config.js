const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    rules: {
      'no-new': 0,
      'curly': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/brace-style': 0,
      '@typescript-eslint/comma-dangle': 0,
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'max-statements-per-line': 0,
      'no-tabs': 0,
      'no-mixed-spaces-and-tabs': 0,
      '@typescript-eslint/consistent-type-definitions': 0,
    },
  },
)
