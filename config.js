let config = {}

config.dbhost = process.env.DB_HOST
config.dbkey = process.env.DB_KEY
config.storagehost = process.env.STORAGE_HOST
config.connString = process.env.STORAGE_KEY
config.appInsightsIKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY
module.exports = config;