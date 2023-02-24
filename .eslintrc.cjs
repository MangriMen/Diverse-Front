module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
    'jest',
    'jsx-a11y',
    'mysticatea',
    'prefer-object-spread',
    'prettier',
    'risxss',
  ],
  globals: {
    alert: true,
    document: true,
    localStorage: true,
    navigator: true,
    window: true,
    HTMLElement: true,
  },
  rules: {
    curly: 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',

    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        printWidth: 80,
        endOfLine: 'auto',
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        bracketSameLine: false,
        bracketSpacing: true,
        arrowParens: 'avoid',
        importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
      },
    ],
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': 0,
    'import/no-default-export': 1,
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'external',
          'internal',
          'builtin',
          'parent',
          'sibling',
          'index',
        ],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
      },
    ],
    'mysticatea/no-useless-rest-spread': 'error',
    'prefer-object-spread/prefer-object-spread': 2,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 2,
    'react/prefer-stateless-function': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/style-prop-object': [
      'warn',
      {
        allow: [
          'FormattedNumber',
          'FormattedNumberParts',
          'FormattedRelativeTime',
        ],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    complexity: ['error', 9],
    'max-lines': ['error', 2000],
    'max-depth': ['error', 3],
    'max-params': ['error', 4],
    'risxss/catch-potential-xss-react': 'error',
    'react/jsx-curly-brace-presence': [
      1,
      {
        props: 'never',
        children: 'always',
        propElementValues: 'always',
      },
    ],
    'react/jsx-boolean-value': 1,
    'no-debugger': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
  root: true,
};
