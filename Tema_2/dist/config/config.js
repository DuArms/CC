"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs = require("fs");
const devConfig = {
    app: {
        deniedPath: /(\.\.\/)|(\?(.*)\?)|\$/,
        host: "localhost",
        port: 4202,
        adresaApi: "/api/v1/",
    },
    secret: {
        spotify_token: fs.readFileSync("./lib/config/token.txt", "utf8"),
        youtube_api: fs.readFileSync("./lib/config/youtube_api.txt", "utf8"),
        watch_api: fs.readFileSync("./lib/config/watch2gether.txt", "utf8")
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'Tema2CC' //numele BD
    },
    mimeType: {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    }
};
//https://developer.spotify.com/console/get-artist-albums/
exports.config = devConfig;
//# sourceMappingURL=config.js.map