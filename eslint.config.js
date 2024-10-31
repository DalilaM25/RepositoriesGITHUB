import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from "@typescript-eslint/eslint-plugin"; 

export default tseslint.config({
  ignores: ["dist"],
  env: {
    browser: true,
    es2020: true,
    node: "current",
    "jest/globals": true,
  },
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    jest: jest,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "jest/no-focused-tests": "off",
  },
});