"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const fs = require("fs");
async function log(request, response) {
    const requestStart = Date.now();
    response.on("finish", () => {
        const { rawHeaders, httpVersion, method, socket, url } = request;
        const { remoteAddress, remoteFamily } = socket;
        let obj = {
            timestamp: Date.now(),
            processingTime: Date.now() - requestStart,
            rawHeaders,
            httpVersion,
            method,
            remoteAddress,
            remoteFamily,
            url
        };
        fs.appendFile('./logs/easy_to_parse_log.txt', JSON.stringify(obj) + "\n", function (err) {
            if (err)
                throw err;
        });
        const text = request.url + " : " + JSON.stringify(obj, null, 3) + '\n\n';
        fs.appendFile('./logs/log.txt', text, function (err) {
            if (err)
                throw err;
        });
    });
}
exports.log = log;
//# sourceMappingURL=logger.js.map