var config = require('./config');
let appInsights = require("applicationinsights");

appInsights.setup(config.appInsightsIKey).start();
module.exports = appInsights;