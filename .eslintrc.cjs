/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "prettier",
    "@typescript-eslint"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error",
    "react/prop-types": "off",
    "@typescript-eslint/no-require-imports": "off",
  }
}