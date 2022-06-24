const autoBind = require("auto-bind");
const { setDriver } = require("mongoose");

module.exports = class Controller {
    constructor() {
        autoBind(this);
    }
}