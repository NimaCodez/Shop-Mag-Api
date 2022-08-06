const Application = require("./app/server");
new Application(process.env.APP_PORT, process.env.DB_URL)