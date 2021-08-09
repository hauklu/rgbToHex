// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [2, "never"], // 函数圆括号_前面没有空格
    // 驼峰命名校验关闭
    camelcase: 'off',
    '@typescript-eslint/camelcase': 0,
    'no-trailing-spaces': 'error', // 行末不要空格
    'array-bracket-spacing': ['error', 'never'], // 方括号 [] 里不要加空格
    'object-curly-spacing': ['error', 'always'], // 花括号 {} 里加空格
    eqeqeq: ['error', 'always'], // 使用 === 和 !== 而不是 == 和 !=
    'no-useless-escape': 'off' // 禁用检测不必要的转义字符
  }
}
