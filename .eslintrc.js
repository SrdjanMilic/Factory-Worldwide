module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [
      "error", 2
    ],
    quotes: [
      "error",
      "single"
    ],
    semi: [
      "error",
      "always"
    ],
    curly: "error",
    "brace-style": "error",
    "no-extra-semi": "error",
    "no-irregular-whitespace": "error",
    "no-multi-spaces": "error",
    "space-before-function-paren": [
      "error",
      "always"
    ],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "eol-last": [
      "error",
      "always"
    ]
  }
}
