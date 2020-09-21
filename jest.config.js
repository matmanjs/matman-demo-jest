module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/tests/**/*.spec.[jt]s?(x)', '**/__tests__/*.[jt]s?(x)'],
  reporters: [
    'default',
    [
      'jest-matman-reporter',
      {
        publicPath: './.matman_output',
        filename: 'report.html',
        expand: true,
      },
    ],
  ],
};
