// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-coverage"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage/data-tools"),
      subdir: ".",
      reporters: [{ type: "html" }, { type: "lcov" }, { type: "text-summary" }],
      check: {
        emitWarning: false,
        global: {
          statements: 55,
          branches: 40,
          functions: 50,
          lines: 55, // TODO target >80%
        },
        each: {
          statements: 45,
          branches: 25,
          functions: 35,
          lines: 45,
        },
      },
      watermarks: {
        statements: [45, 75],
        branches: [30, 60],
        functions: [40, 70],
        lines: [45, 75], // TODO target >80%
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: [
          "--no-sandbox",
          "--user-data-dir=/tmp/chrome-test-profile",
          "--disable-web-security",
          "--remote-debugging-port=9222",
        ],
        debug: true,
      },
    },
    reporters: ["progress", "coverage"],
    logLevel: config.LOG_INFO,
    browsers: ["Chrome", "ChromeHeadless"],
    restartOnFileChange: true
  });
};
