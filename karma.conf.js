/* eslint-env node*/

module.exports = function (config) {
  "use strict";

  config.set({

    basePath: "./",

    files: [
      "node_modules/angular/angular.js",
      "node_modules/angular-route/angular-route.js",
      "node_modules/angular-mocks/angular-mocks.js",
      "node_modules/underscore/underscore.js",
      "app/cards/**/*.js",
      "app/klondike/piles/pile.js",
      "app/klondike/piles/foundationPile.js",
      "app/klondike/piles/remainderPile.js",
      "app/klondike/piles/tableauPile.js",
      "app/klondike/*.js",
      "tests/**/*.js"
    ],
    autoWatch: true,

    frameworks: ["jasmine"],

    browsers: ["Chrome", "Firefox"],

    reporters: ['progress', 'junit'],

    plugins: [
      "karma-chrome-launcher",
      "karma-firefox-launcher",
      "karma-jasmine",
      "karma-junit-reporter",
      "karma-phantomjs-launcher",
      "karma-safari-launcher"
    ],

    junitReporter: {
      outputFile: "test-results.xml",
      outputDir: "test-results"
    }

  });
};