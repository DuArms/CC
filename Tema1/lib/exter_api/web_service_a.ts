const axios = require('axios')

import {config} from "../config"

const api_key = config.secret.watch_api

async function web_service_a( youtube_link,room_title) {
    try {

        let site_string = 'https://w2g.tv/rooms/create.json'
        console.log("Requesting at " + site_string)

        let res = await axios.post(site_string ,
            {
                "w2g_api_key": api_key,
                "share": youtube_link,  // URL of the video to share - optional
                "bg_color": "#000000", // Background color of the room in HTML notation - optional
                "bg_opacity": "50" ,// Background opacity of the room (0 - 100) - optional
                "title":room_title
            } ,{
                "charset" : "utf-8",
                "content-type": "application/json"

            }

        )
        return `https://w2g.tv/rooms/${res.data.streamkey}`
    } catch (e) {
    //   console.log(e)
    }
    return ["END"]

}


export {
    web_service_a
}