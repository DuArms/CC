import {IncomingMessage, ServerResponse} from 'http'
import {config} from "../config";
import {HttpCodes} from "./HttpCodes"
import {home_page} from "../const/html_pages"
import {TemaCC} from "../api_routes/api_routes";

const fs = require('fs');
const path = require('path');



export class MyRouter {                     //clasa ce implementeaza functionalitatile de routare si mapare

    private static mapGet: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPost: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapPut: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};
    private static mapDelete: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } } = {};

    public static get(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapGet[path] = functie;
    }

    public static post(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPost[path] = functie;
    }

    public static put(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapPut[path] = functie;
    }

    public static delete(path: string, functie: { (req: IncomingMessage, res: ServerResponse): void }): void {
        this.mapDelete[path] = functie;
    }

    public static route(request: IncomingMessage, response: ServerResponse): void {
        switch (request.method) {
            default: {
                response.end("Eroare");
                response.writeHead(404, "Eroare");
            }
                break;
            case "GET": {
                this.check(this.mapGet, request, response);
            }
                break;
            case "POST": {
                this.check(this.mapPost, request, response);
            }
                break;
            case "PUT": {
                this.check(this.mapPut, request, response);
            }
                break;
            case "DELETE": {
                this.check(this.mapDelete, request, response);
            }
                break;
        }
    }

    public static check(map: { [key: string]: { (req: IncomingMessage, res: ServerResponse): void } }, request: IncomingMessage, response: ServerResponse): void {
        const {app: {adresaApi, deniedPath}} = config;
        if (request.url.match(deniedPath) != null) {
            fs.readFile('./403.html', function (error, content) {
                response.writeHead(HttpCodes.HttpStatus_Forbidden, {'Content-Type': 'text/html'});
                response.end(content, 'utf-8');
            });
            return;
        }

        if (request.url.match(adresaApi) != null) {
            let path = request.url.split("?");
            if (map[path[0]] == undefined) {
                response.writeHead(HttpCodes.HttpStatus_NotFound, "File Not Found");
                response.end();
            } else {
                map[path[0]](request, response);
            }
        } else {
            let filePath = './lib/html' + request.url;
            if (filePath == './lib/html/') {
                filePath = './lib/html/home.html';
            }
            let extname = String(path.extname(filePath)).toLowerCase();
            const mimeTypes = config.mimeType;
            let contentType = mimeTypes[extname] || 'application/octet-stream';

            fs.readFile(filePath, function (error, content) {
                if (error) {
                    if (error.code == 'ENOENT') {
                        fs.readFile('./404.html', function (error, content) {
                            response.writeHead(HttpCodes.HttpStatus_NotFound, { 'Content-Type': 'text/html' });
                            response.end(content, 'utf-8');
                        });
                    }
                    else {
                        response.writeHead(HttpCodes.HttpStatus_InternalServerError);
                        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    }
                }
                else {
                    response.writeHead(HttpCodes.HttpStatus_OK, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
    }
}



new TemaCC;