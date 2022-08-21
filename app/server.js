const express = require('express');
const { default: mongoose, mongo } = require("mongoose");
const morgan = require('morgan');
require("dotenv").config()
const path = require('path');
const Router = require("./routes/router");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

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
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(express.static(path.join(__dirname, '..', "public")));
        this.#app.use("/swagger", swaggerUI.serve)
        this.#app.get("/swagger", swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Shop-Mag Api",
                    version: "2.0.0",
                    description: "A Shop Api with Blog Section",
                    contact: {
                        name: "Nima",
                        url: "https://freerealapi.com",
                        email: "nimacodes@gmail.com",
                    },
                },
                servers: [
                    {
                        url: "http://localhost:8000",
                    },
                ],
                components: {
                    securitySchemes: {
                        BearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security: [{ BearerAuth: [] }]
            },
            apis: ["./app/routes/**/*.js"],
        }),
            { explorer: true }
        ))
    }

    CreateServer() {
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log('server listening on port >' + this.#PORT);
        });
    }

    ConnectToMongoDb() {
        mongoose.connect(this.#DB_URL, (err) => {
            if (!err) return console.log("Established connection To MongoDb")
            return console.log("Failed to connect to MongoDb");
        })
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDb");
        })
        mongoose.connection.on("disconnect", () => {
            console.log("MOngoDb is disconnected");
        })
        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    }

    InitRedis() {
        require("./utils/init_redis");
    }

    CreateRoutes() {
        this.#app.use(Router);
    }

    ErrorHandler() {
        this.#app.use((req, res, next) => {
            next(createError.NotFound("Route not found 🔍"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const status = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(status).json({
                errors: {
                    status,
                    message
                }
            })
        })
    }
}