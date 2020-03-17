module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-debugger": "off",
    "no-console": "off",
    "undefined": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "quotes": [
      2, 
      "double", 
      { "avoidEscape": true }
    ],
    "semi": [
      "error",
      "always"
    ],
    "indent": [
      "error",
      2
    ]
  }
};