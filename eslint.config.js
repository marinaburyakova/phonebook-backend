import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ИСПРАВЛЕНО: Правила игнорирования теперь прописаны внутри конфигурации flat config
  {
    ignores: [
      "node_modules/", 
      "dist/", 
      "mongo.js"
    ]
  },
  {
    languageOptions: { 
      globals: {
        ...globals.node,
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^next$' }],
      'no-console': 'off',
      'eqeqeq': 'error',
    }
  }
];
