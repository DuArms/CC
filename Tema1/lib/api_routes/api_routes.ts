import {config} from "../config";
import {MyRouter} from "../router/router"
import {IncomingMessage, ServerResponse} from 'http'
import {web_service_a, web_service_b, web_service_c} from "../exter_api";
import {HttpCodes} from "../router/HttpCodes";
import {MyURLparser} from '../router/MyURLparser';
import * as fs from "fs"

const urlParser = new MyURLparser();

export class TemaCC {
    constructor() {
        this.init();
    }

    public get_song(request: IncomingMessage, response: ServerResponse) {
        const start = Date.now();
       // while (Date.now() - start < 2 * 1000);
        const params = urlParser.getInput(request)
        web_service_b({"artist_name": params[0]['_id']}).then(r => {
            let x = Math.floor(Math.random() * r.length)
            let title = r[x]
            web_service_c(r[x]).then((res) => {
                web_service_a(res, title).then((res) => {
                    response.writeHead(HttpCodes.HttpStatus_OK, config.mimeType[".html"])
                    response.end(res);
                })
            })
        }).catch(e => {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end("", 'utf-8');
        })
    }


    public get_metrics(request: IncomingMessage, response: ServerResponse): void {
        let logs = fs.readFileSync("./logs/easy_to_parse_log.txt", "utf8").toString().split("\n")
        logs = logs.slice(0, logs.length - 1)

        let procces_time = 0 ;

        logs.forEach((log)=>{
          let jlog =  JSON.parse(log);
          procces_time += jlog.processingTime
        })
        let log_count = logs.length;
        let avg_proces_time = procces_time / log_count;

        response.writeHead(HttpCodes.HttpStatus_OK, config.mimeType[".json"])
        response.end(JSON.stringify({
            "procces_time" : procces_time ,
            "avg_proces_time" : avg_proces_time,
            "log_count" : log_count
        }));

        response.end()


    }


    public init(): any {
        const {app: {adresaApi}} = config;
        //GET
        MyRouter.get(adresaApi + "get_results", this.get_song.bind(this));
        MyRouter.get(adresaApi + "metrics", this.get_metrics.bind(this));

    }
}