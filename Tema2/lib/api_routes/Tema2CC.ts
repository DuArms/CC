import {MyURLparser} from "../router/MyURLparser";
import {config} from "../config/index"
import {MyRouter} from "../router/router"
import {IncomingMessage, ServerResponse} from "http";
const urlParser = new MyURLparser();


const apiPath = config.app.adresaApi

export class Tema2CC {
    constructor() {
        this.init();
    }


    public get_test(req: IncomingMessage, res: ServerResponse) {
        res.end("TEST")
        res.statusCode = 200;

        console.log("TEST")
    }

    public init(){
        MyRouter.get(apiPath + "test",this.get_test.bind(this))



    }

}