import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  jsonc: true,
  vue: false,
  astro: false,
}, {
  files: ['src/**/*.ts'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  rules: {
    'no-console': 'warn',
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs'],
    'complexity': ['warn', 8],
    'ts/switch-exhaustiveness-check': [
      'error',
      {
        considerDefaultExhaustiveForUnions: true,
      },
    ],
    'ts/method-signature-style': [
      'error',
      'method',
    ],
    'ts/strict-boolean-expressions': 'off',
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
  },
})
