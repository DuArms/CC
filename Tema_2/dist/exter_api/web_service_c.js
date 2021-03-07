"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web_service_c = void 0;
const request = require('request-promise');
const config_1 = require("../config");
let url = require('url');
const youtube_api_key = config_1.config.secret.youtube_api;
async function web_service_c(input) {
    let search_name = input;
    let youtbe_search = encodeURI(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${search_name}&key=${youtube_api_key}`);
    console.log("Requesting at " + youtbe_search);
    let youtube_info = undefined;
    try {
        let options = {
            url: youtbe_search,
        };
        youtube_info = await request.get(options).json(); // []
        let clip = youtube_info.items[0];
        let title = clip.snippet["title"];
        let channelTitle = clip.snippet["channelTitle"];
        let id = clip["id"]["videoId"];
        let video_url = encodeURI(`https://www.youtube.com/watch?v=${id}&ab_channel=${channelTitle}`);
        return video_url;
    }
    catch (e) {
        console.log(e);
    }
    return ["END"];
}
exports.web_service_c = web_service_c;
//# sourceMappingURL=web_service_c.js.map