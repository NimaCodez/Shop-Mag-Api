const Application = require("./app/server");
new Application(process.env.APP_PORT, "mongodb://localhost:27017/storeDb")