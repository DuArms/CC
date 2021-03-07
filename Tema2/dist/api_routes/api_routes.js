"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemaCC = void 0;
const config_1 = require("../config");
const router_1 = require("../router/router");
const HttpCodes_1 = require("../router/HttpCodes");
const MyURLparser_1 = require("../router/MyURLparser");
const fs = require("fs");
const urlParser = new MyURLparser_1.MyURLparser();
class TemaCC {
    constructor() {
        this.init();
    }
    get_song(request, response) {
        const start = Date.now();
        // while (Date.now() - start < 2 * 1000);
        const params = urlParser.getInput(request);
        web_service_b({ "artist_name": params[0]['_id'] }).then(r => {
            let x = Math.floor(Math.random() * r.length);
            let title = r[x];
            web_service_c(r[x]).then((res) => {
                web_service_a(res, title).then((res) => {
                    response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, config_1.config.mimeType[".html"]);
                    response.end(res);
                });
            });
        }).catch(e => {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end("", 'utf-8');
        });
    }
    get_metrics(request, response) {
        let logs = fs.readFileSync("./logs/easy_to_parse_log.txt", "utf8").toString().split("\n");
        logs = logs.slice(0, logs.length - 1);
        let procces_time = 0;
        logs.forEach((log) => {
            let jlog = JSON.parse(log);
            procces_time += jlog.processingTime;
        });
        let log_count = logs.length;
        let avg_proces_time = procces_time / log_count;
        response.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, config_1.config.mimeType[".json"]);
        response.end(JSON.stringify({
            "procces_time": procces_time,
            "avg_proces_time": avg_proces_time,
            "log_count": log_count
        }));
        response.end();
    }
    init() {
        const { app: { adresaApi } } = config_1.config;
        //GET
        router_1.MyRouter.get(adresaApi + "get_results", this.get_song.bind(this));
        router_1.MyRouter.get(adresaApi + "metrics", this.get_metrics.bind(this));
    }
}
exports.TemaCC = TemaCC;
//# sourceMappingURL=api_routes.js.map