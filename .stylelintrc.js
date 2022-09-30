module.exports = {
  extends: [
    // 使用标准规则检查样式代码是否正确
    'stylelint-config-standard',
    // 对样式代码按照约定进行排序
    'stylelint-config-recess-order',
    // 解决 stylelint 和 prettier 中的冲突，并按照 prettier 风格进行格式化
    'stylelint-config-prettier',
  ],
  // stylelint 中使用 prettier
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,

    // 其他 rules
    // 多个样式块前加空行分割（除了单行注释后面、第一个嵌套前面）
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'function-calc-no-invalid': null,
    'selector-type-no-unknown': [
      true,
      {
        ignore: ['custom-elements'],
      },
    ],
    // 可以使用 '//' 类型的注释
    'no-invalid-double-slash-comments': null,
    'number-leading-zero': null,
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'declaration-empty-line-before': null,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'mixin',
          'extend',
          'content',
          'include',
          'if',
          'for',
          'function',
          'return',
          'each',
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'import', 'local', 'deep', 'mixin'],
      },
    ],
    // 缩进两个空格
    indentation: 2,
    'no-descending-specificity': null,
    'declaration-colon-newline-after': null,
  },
};
