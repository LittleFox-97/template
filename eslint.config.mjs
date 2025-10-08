import antfu from '@antfu/eslint-config'

export default antfu({
  // Тип проекта - библиотека (npm пакет)
  type: 'lib',

  // Включить TypeScript поддержку
  typescript: {
    tsconfigPath: './tsconfig.json',
    overrides: {
      'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'ts/no-explicit-any': 'warn',
      'ts/prefer-nullish-coalescing': 'error',
      'ts/prefer-optional-chain': 'error',
    },
  },

  // Включить Node.js правила
  node: true,

  // Отключить ненужные фреймворки (явно указываем для ясности)
  react: false,
  nextjs: false,
  svelte: false,
  unocss: false,
  astro: false,
  solid: false,
  vue: false,
  jsonc: true,

  // Настройки стилистики
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  // Файлы для игнорирования
  ignores: [
    'dist/**',
    'node_modules/**',
    'coverage/**',
    '*.min.js',
    'temp/**',
    '.nyc_output/**',
  ],

  // Общие правила для всех файлов
  rules: {
    'no-console': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'ts/strict-boolean-expressions': 'off',
  },
})
