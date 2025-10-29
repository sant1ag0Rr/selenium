module.exports = {
  extends: [
    'stylelint-config-standard',
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: [
          'theme',
          'screen',
        ],
      },
    ],
  },
};
