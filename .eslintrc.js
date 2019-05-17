module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-prop-type-constructor': 0,
    'comma-dangle': 0,//末尾逗号
    'max-len': [1, 150],//最大行
    'eqeqeq': 1,
    'prefer-destructuring': ['warn', {
      'object': true,
      'array': false
    }]//只对象推荐解构
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
