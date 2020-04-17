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
    // 不使用缩进检查
    'indent': [0, 4],
    // 不检查函数名和()之间的格式
    "space-before-function-paren": ["error", "never"],
    // 此规则将通过禁止或要求(在左侧和右侧的一个或多个空格来强制直接在括号内部的间距的一致性)
    "space-in-parens": ["error", "never"],
    "semi": ["off", "never"],
    "no-var": "error",
    "camelcase": 0,
    "one-var": 0,
    'no-tabs': 'off'
     
  }
}