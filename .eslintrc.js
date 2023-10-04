module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: [
   '@typescript-eslint/eslint-plugin',
    'react',
    'simple-import-sort',
    // 'jsx-a11y'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // 'plugin:jsx-a11y/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['.eslintrc.js', 'src/**/*.css', 'src/**/*.svg', 'src/**/*.ttf'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-duplicate-imports': ['error', { includeExports: true }],
    'simple-import-sort/imports': [
      'error',
      {
        'groups': [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // // Internal packages.
          // ["^(@|components)(/.*|$)"],
          // // Side effect imports.
          // ["^\\u0000"],
          // // Parent imports. Put `..` last.
          // ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // // Style imports.
          ['^.+\\.?(css)$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error',
  },
};
