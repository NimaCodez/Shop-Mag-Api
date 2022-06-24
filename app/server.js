const express = require('express');
const { default: mongoose, mongo } = require("mongoose")
const path = require('path');
const Router = require("./routes/router");

module.exports = class Application {
    #app = express();
    #PORT;
    #DB_URL;
    constructor(PORT, DB_URL) {
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.ConfigApplication();
        this.ConnectToMongoDb();
        this.CreateServer();
        this.CreateRoutes();
        this.ErrorHandler();
    }
    ConfigApplication() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended : true }));
        this.#app.use(express.static(path.join(__dirname, '..', "public")));
    }
    CreateServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('server listening on port >' + this.#PORT);
        });
    }
    ConnectToMongoDb() {
        mongoose.connect(this.#DB_URL, (err) => {
            if (!err) return console.log("Connected To MongoDb")
            return console.log("Failed to connect to MongoDb");
        })
    }
    CreateRoutes() {
        this.#app.use(Router);
    }
    ErrorHandler() {
        this.#app.use((req, res, next) => {
            return res.status(404).json({
                status: 404,
                message: "Page not found! 🔍"
            })
        })
        this.#app.use((error, req, res, next) => {
            const status = error.status || 500;
            const message = error.message || error.msg || error.text || "Internal Server Error"
            return res.status(status).json({
                status,
                message
            })
        })
    }
}