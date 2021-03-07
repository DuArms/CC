"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
let mongoose = require("mongoose");
let f = async () => {
    let MongoClient = require('mongodb').MongoClient;
    let client = await MongoClient.connect(`mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
    let db = client.db("Tema2CC");
    try {
        let dCollection = await db.collection("Floricele");
        let result = await dCollection.find({ 'test': 1 });
        let s = await result.toArray();
        console.log(s);
    }
    catch (err) {
        console.error(err);
    }
};
exports.f = f;
//# sourceMappingURL=testFile.js.map