import {IncomingMessage, ServerResponse} from "http"
import {config} from "./config"
import {MyRouter} from "./router/router"

import {log} from "./loger/logger"

const http = require('http');
const {app: {port, host}} = config;

const server = http.createServer(function (request: IncomingMessage, response: ServerResponse) {
        try{
            log(request,response)
            MyRouter.route(request, response)
        } catch (e){
            console.log(e)

            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end("", 'utf-8');
        }


    }
);

server.listen(port);

console.log(`Server running at http://${host}:${port}/`);




