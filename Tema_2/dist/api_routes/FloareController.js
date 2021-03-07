"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloareController = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const FloriceleRepo_1 = require("../repo/FloriceleRepo");
const Floricica_1 = require("../models/Floricica");
const router_1 = require("../router/router");
const config_1 = require("../config");
const MyURLparser_1 = require("../router/MyURLparser");
const HttpCodes_1 = require("../router/HttpCodes");
class FloareController {
    constructor() {
        this.init();
        this.floareModel = new Floricica_1.Floare().getModelForClass(Floricica_1.Floare);
        this.urlParser = new MyURLparser_1.MyURLparser();
    }
    static whenDone(res, response, typ = 'application/json') {
        if (response.length == 0)
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NoContent, typ);
        else
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, typ);
        res.end(JSON.stringify(response));
    }
    getAll(request, res) {
        let fields = this.urlParser.getInput(request)[1];
        this.floriceleRepo.getAll(fields).then(data => {
            FloareController.whenDone(res, data);
        });
    }
    getById(req, res) {
        let parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getById(parameters[0]['_ID']).then(data => {
            FloareController.whenDone(res, data);
        });
    }
    getBy(req, res) {
        const parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getBy(parameters[0], parameters[1], parameters[2]).then(data => {
            FloareController.whenDone(res, data);
        });
    }
    getCount(req, res) {
        let parameters = this.urlParser.getInput(req);
        this.floriceleRepo.getCount(parameters[0]).then(data => {
            FloareController.whenDone(res, { "count": data });
        });
    }
    getCountAll(req, res) {
        this.floriceleRepo.getCount({}).then(data => {
            FloareController.whenDone(res, { "count": data });
        });
    }
    addOne(req, res) {
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let newFloare = body['toPost'];
            if (newFloare == undefined) {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_BadRequest, 'text/text');
                res.end("You need to have { 'toPost' : obj  } ");
            }
            this.floriceleRepo.addOne(newFloare).then((done) => {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                res.end(done.toString());
            });
        });
    }
    addMany(req, res) {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let newFloare = body['toPost'];
            if (newFloare == undefined) {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_BadRequest, 'text/text');
                res.end("You need to have { 'toPost' : obj  } ");
            }
            this.floriceleRepo.addMany(newFloare).then(() => {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                res.end('ok');
            });
        });
    }
    update(req, res) {
        let reqBody = "";
        req.on('data', chunk => {
            reqBody += chunk.toString();
        }).on('end', () => {
            let body = JSON.parse(reqBody);
            let parameters = this.urlParser.getInput(req);
            let updateDoc = body['toUpdate'];
            if (updateDoc == undefined) {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_BadRequest, 'text/text');
                res.end("You need to have { 'toUpdate' : obj  } ");
            }
            this.floriceleRepo.update(parameters[0], updateDoc).then((done) => {
                res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
                res.end(done.toString());
            });
        });
    }
    updateData(req, res) {
        let updateDoc = { "AN": new Date().getFullYear() };
        this.floriceleRepo.update({}, updateDoc).then((done) => {
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
            res.end(done.toString());
        });
    }
    delete(req, res) {
        const parameters = this.urlParser.getInput(req);
        this.floriceleRepo.delete(parameters[0]).then((done) => {
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_NoContent, 'text/text');
            res.end(done.toString());
        });
    }
    deleteall(req, res) {
        this.floriceleRepo.delete({}).then((done) => {
            res.writeHead(HttpCodes_1.HttpCodes.HttpStatus_OK, 'text/text');
            res.end(done.toString());
        });
    }
    init() {
        let { app: { adresaApi } } = config_1.config;
        adresaApi = adresaApi + "flori/";
        //GET
        router_1.MyRouter.get(adresaApi + "getall", this.getAll.bind(this));
        router_1.MyRouter.get(adresaApi + "byid", this.getById.bind(this));
        router_1.MyRouter.get(adresaApi + "by", this.getBy.bind(this));
        router_1.MyRouter.get(adresaApi + "count", this.getCount.bind(this));
        router_1.MyRouter.get(adresaApi + "countall", this.getCountAll.bind(this));
        //POST
        router_1.MyRouter.post(adresaApi + "addone", this.addOne.bind(this));
        router_1.MyRouter.post(adresaApi + "addmany", this.addMany.bind(this));
        //PUT
        router_1.MyRouter.put(adresaApi + "update", this.update.bind(this));
        router_1.MyRouter.put(adresaApi + "updateyear", this.updateData.bind(this));
        //DELETE
        router_1.MyRouter.delete(adresaApi + "delete", this.delete.bind(this));
        router_1.MyRouter.delete(adresaApi + "deleteall", this.deleteall.bind(this));
    }
}
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", FloriceleRepo_1.FloriceleRepo)
], FloareController.prototype, "floriceleRepo", void 0);
exports.FloareController = FloareController;
//# sourceMappingURL=FloareController.js.map