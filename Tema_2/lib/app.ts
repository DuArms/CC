import {IncomingMessage, ServerResponse} from "http"
import {config} from "./config"
import {MyRouter} from "./router/router"
import {MyMongo} from "./repo/MyMongoDB"


const http = require('http');
const {app: {port, host}} = config;

MyMongo.init(config.db.name)

const server = http.createServer(function (request: IncomingMessage, response: ServerResponse) {
        try{

            MyRouter.route(request, response)

        } catch (e){
            console.log(e)
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end("", 'utf-8');
        }


    }
);

server.listen(port);

console.log(`Server running at http://${host}:${port}/`);




