"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tema2CC = void 0;
const MyURLparser_1 = require("../router/MyURLparser");
const index_1 = require("../config/index");
const router_1 = require("../router/router");
const urlParser = new MyURLparser_1.MyURLparser();
const apiPath = index_1.config.app.adresaApi;
class Tema2CC {
    constructor() {
        this.init();
    }
    get_test(req, res) {
        res.end("TEST");
        res.statusCode = 200;
        console.log("TEST");
    }
    init() {
        router_1.MyRouter.get(apiPath + "test", this.get_test.bind(this));
    }
}
exports.Tema2CC = Tema2CC;
//# sourceMappingURL=Tema2CC.js.map