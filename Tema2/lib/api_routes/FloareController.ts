import {Inject} from "typescript-ioc";
import {FloriceleRepo} from "../repo/FloriceleRepo";
import {Floare} from "../models/Floricica";
import {IncomingMessage, ServerResponse} from 'http'
import {MyRouter} from "../router/router"
import {config} from "../config";
import {MyURLparser} from '../router/MyURLparser';
import {HttpCodes} from '../router/HttpCodes'

export class FloareController {                  //clasa care inplemnteza functionalitatile pentru utilizatori

    @Inject
    private floriceleRepo: FloriceleRepo;
    private floareModel;
    private urlParser: MyURLparser;

    constructor() {
        this.init();
        this.floareModel = new Floare().getModelForClass(Floare);
        this.urlParser = new MyURLparser();
    }

    private static whenDone(res: ServerResponse, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }

    public getAll(request: IncomingMessage, res: ServerResponse): void {
        let fields = this.urlParser.getInput(request)[1];
        this.floriceleRepo.getAll(fields).then(data => {
            FloareController.whenDone(res, data);
        });
    }

    public getById(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getById(parameters[0]['_ID']).then(data => {
            FloareController.whenDone(res, data);
        });
    }

    public getBy(req: IncomingMessage, res: ServerResponse): void {
        const parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getBy(parameters[0], parameters[1], parameters[2]).then(data => {
            FloareController.whenDone(res, data);
        });
    }

    public getCount(req: IncomingMessage, res: ServerResponse): void {
        let parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getCount(parameters[0]).then(data => {
            FloareController.whenDone(res, {"count": data})
        });
    }

    public getCountAll(req: IncomingMessage, res: ServerResponse): void {
        this.floriceleRepo.getCount({}).then(data => {
            FloareController.whenDone(res, {"count": data})
        });
    }

    public addOne(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)
            let newFloare: Floare = body['toPost'];

            if (newFloare == undefined) {
                res.writeHead(HttpCodes.HttpStatus_BadRequest, 'text/text')
                res.end("You need to have { 'toPost' : obj  } ")
            }
            this.floriceleRepo.addOne(newFloare).then((done) => {
                res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                res.end(done.toString());
            });
        });

    }

    public addMany(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let newFloare: Floare[] = body['toPost'];
            if (newFloare == undefined) {
                res.writeHead(HttpCodes.HttpStatus_BadRequest, 'text/text')
                res.end("You need to have { 'toPost' : obj  } ")
            }
            this.floriceleRepo.addMany(newFloare).then(() => {
                res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                res.end('ok');
            });

        });
    }

    public update(req: IncomingMessage, res: ServerResponse): void {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody)

            let parameters = this.urlParser.getInput(req);
            let updateDoc = body['toUpdate'];

            if (updateDoc == undefined) {
                res.writeHead(HttpCodes.HttpStatus_BadRequest, 'text/text')
                res.end("You need to have { 'toUpdate' : obj  } ")
            }

            this.floriceleRepo.update(parameters[0], updateDoc).then((done) => {
                res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
                res.end(done.toString());
            });


        })
    }

    public updateData(req: IncomingMessage, res: ServerResponse): void {
        let updateDoc = {"AN": new Date().getFullYear()}
        this.floriceleRepo.update({}, updateDoc).then((done) => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(done.toString());
        });
    }


    public delete(req: IncomingMessage, res: ServerResponse): void {
        const parameters = this.urlParser.getInput(req);
        this.floriceleRepo.delete(parameters[0]).then((done) => {
            res.writeHead(HttpCodes.HttpStatus_NoContent, 'text/text');
            res.end(done.toString());
        });
    }

    public deleteall(req: IncomingMessage, res: ServerResponse): void {
        this.floriceleRepo.delete({}).then((done) => {
            res.writeHead(HttpCodes.HttpStatus_OK, 'text/text');
            res.end(done.toString());
        });
    }

    public init(): any {
        let {app: {adresaApi}} = config;
        adresaApi = adresaApi + "flori/"
        //GET
        MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));

        //POST
        MyRouter.post(adresaApi + "addone", this.addOne.bind(this));
        MyRouter.post(adresaApi + "addmany", this.addMany.bind(this));

        //PUT
        MyRouter.put(adresaApi + "update", this.update.bind(this));
        MyRouter.put(adresaApi + "updateyear", this.updateData.bind(this));

        //DELETE
        MyRouter.delete(adresaApi + "delete", this.delete.bind(this));
        MyRouter.delete(adresaApi + "deleteall", this.deleteall.bind(this));

    }
}
