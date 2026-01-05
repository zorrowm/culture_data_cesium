import eslint from '@eslint/js';
import pluginQuasar from '@quasar/app-vite/eslint';
import prettierSkipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfigWithVueTs(
  {
    /**
     * Ignore the following files.
     * Please note that pluginQuasar.configs.recommended() already ignores
     * the "node_modules" folder for you (and all other Quasar project
     * relevant folders and files).
     *
     * ESLint requires "ignores" key to be the only one in this object
     */
    ignores: [
      'public/*',
      'eslint.config.js',
      'postcss.config.js',
      'quasar.config.ts'
    ]
  },

  pluginQuasar.configs.recommended(),
  eslint.configs.recommended,
  tseslint.configs.recommended,

  /**
   * https://eslint.vuejs.org
   *
   * pluginVue.configs.base
   *   -> Settings and rules to enable correct ESLint parsing.
   * pluginVue.configs[ 'flat/essential']
   *   -> base, plus rules to prevent errors or unintended behavior.
   * pluginVue.configs["flat/strongly-recommended"]
   *   -> Above, plus rules to considerably improve code readability and/or dev experience.
   * pluginVue.configs["flat/recommended"]
   *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
   */
  pluginVue.configs['flat/essential'],

  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    },
  },
  // https://github.com/vuejs/eslint-config-typescript
  vueTsConfigs.recommendedTypeChecked,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.browser,
        ...globals.node, // SSR, Electron, config files
        process: 'readonly', // process.env.*
        ga: 'readonly', // Google Analytics
        cordova: 'readonly',
        Capacitor: 'readonly',
        chrome: 'readonly', // BEX related
        browser: 'readonly', // BEX related
      },
    },

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    // add your custom rules here
    rules: {
      'prefer-promise-reject-errors': 'off',
      // allow debugger during development only
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      //允许显式转换为any
      '@typescript-eslint/no-explicit-any': 'off',
      //关闭
      'vue/multi-word-component-names': 'off',
      // 优先使用 interface 而不是 type
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      'vue/no-unused-vars': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'vue/no-setup-props-destructure': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      //属性名连接字符串
      'vue/attribute-hyphenation': 'off',
      'vue/component-definition-name-casing': 'off',
      'vue/v-on-event-hyphenation': 'off',
      // vue首行缩进两字符
      'vue/html-indent': [
        'error',
        2,
        {
          // 属性缩进的乘数。默认为1。
          attribute: 1,
          // 顶级语句的缩进倍数。默认为1。
          baseIndent: 1,
          // 右括号缩进的乘数。默认为0。
          closeBracket: 0,
          // 属性是否应垂直对齐到多行情况下的第一个属性的条件。默认为true
          alignAttributesVertically: true,
          // 忽略节点的选择器。默认是[]
          ignores: [],
        },
      ],
      quotes: ['warn', 'single', { avoidEscape: true }],

      // this rule, if on, would require explicit return type on the `render` function
      '@typescript-eslint/explicit-function-return-type': 'off',

      // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
      '@typescript-eslint/no-var-requires': 'off',

      // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
      // does not work with type definitions
      'no-unused-vars': 'off',
      'no-case-declarations': 'off',

      //import自动排序配置
      //https://github.com/lydell/eslint-plugin-simple-import-sort/
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      //改为警告
      '@typescript-eslint/no-this-alias': 'off',

      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      'vue/valid-v-for': 'off',
      'vue/require-v-for-key': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'vue/require-valid-default-prop': 'off',
      '@typescript-eslint/consistent-type-imports':'off',
      'no-empty':'warn'
    },
  },

  {
    files: ['src-pwa/custom-service-worker.ts'],
    languageOptions: {
      globals: {
        ...globals.serviceworker,
      },
    },
  },

  prettierSkipFormatting,
);
