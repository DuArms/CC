"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web_service_b = void 0;
const request = require('request-promise');
const config_1 = require("../config");
const const_1 = require("../const");
let token = config_1.config.secret.spotify_token;
async function web_service_b(input = {}) {
    let artist_name = input[const_1.key.artist_name];
    let url_artist_albumes = `https://api.spotify.com/v1/search?q=${artist_name}&type=artist&market=RO&limit=1`;
    console.log("Requesting at " + url_artist_albumes);
    let artist_info = undefined;
    try {
        let options = {
            url: url_artist_albumes,
            headers: {
                'User-Agent': 'client',
                'Authorization': `Bearer ${token}`,
            }
        };
        artist_info = await request.get(options).json(); // []
        let albums_content = [];
        let obj;
        artist_info.artists.items.forEach(albums => {
            obj = {
                "id": albums[const_1.key.id],
                "name": albums[const_1.key.name],
            };
            if (obj.name.toLowerCase() == artist_name.toLocaleLowerCase()) {
                options.url = `https://api.spotify.com/v1/artists/${obj["id"]}/top-tracks?market=RO`;
                albums_content.push(request.get(options).json());
            }
        });
        let nume = await Promise.all(albums_content);
        let top_songs_name = [];
        nume.forEach((value, index) => {
            let song_name_list = value[const_1.key.tracks];
            for (let song of song_name_list) {
                top_songs_name.push(song[const_1.key.name] + " " + artist_name);
                // console.log(song["name"]  , song["popularity"])
            }
        });
        return top_songs_name;
    }
    catch (e) {
        console.log(e);
    }
    return ["Rick Astley - Never Gonna Give You Up (Video)"];
}
exports.web_service_b = web_service_b;
//# sourceMappingURL=web_service_b.js.map