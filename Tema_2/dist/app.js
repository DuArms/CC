"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const router_1 = require("./router/router");
const MyMongoDB_1 = require("./repo/MyMongoDB");
const http = require('http');
const { app: { port, host } } = config_1.config;
MyMongoDB_1.MyMongo.init(config_1.config.db.name);
const server = http.createServer(function (request, response) {
    try {
        router_1.MyRouter.route(request, response);
    }
    catch (e) {
        console.log(e);
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end("", 'utf-8');
    }
});
server.listen(port);
console.log(`Server running at http://${host}:${port}/`);
//# sourceMappingURL=app.js.map