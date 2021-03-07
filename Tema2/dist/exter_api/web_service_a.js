"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web_service_a = void 0;
const axios = require('axios');
const config_1 = require("../config");
const api_key = config_1.config.secret.watch_api;
async function web_service_a(youtube_link, room_title) {
    try {
        let site_string = 'https://w2g.tv/rooms/create.json';
        console.log("Requesting at " + site_string);
        let res = await axios.post(site_string, {
            "w2g_api_key": api_key,
            "share": youtube_link,
            "bg_color": "#000000",
            "bg_opacity": "50",
            "title": room_title
        }, {
            "charset": "utf-8",
            "content-type": "application/json"
        });
        return `https://w2g.tv/rooms/${res.data.streamkey}`;
    }
    catch (e) {
        //   console.log(e)
    }
    return ["END"];
}
exports.web_service_a = web_service_a;
//# sourceMappingURL=web_service_a.js.map