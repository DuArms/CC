"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMongo = void 0;
class MyMongo {
    constructor(database, table) {
        this.database = database;
        this.table = table;
        this.url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
    }
    static async init(database) {
        let url = process.env.MONGOLAB_URI || ' mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        await MyMongo.db_connect(url, database);
    }
    static async db_connect(url, database) {
        let MongoClient = require('mongodb').MongoClient;
        if (MyMongo.client == undefined) {
            MyMongo.client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }); //eventual de scos "useUnifiedTopology: true"
            MyMongo.db = MyMongo.client.db(database);
        }
    }
    async query(params, fields = {}, sortParams = {}) {
        if (params.nu_fa_nimic === "adevarat") {
            return [];
        }
        try {
            await this.ifMongoNotOpen();
            this.dCollection = await MyMongo.db.collection(this.table);
            let result = await this.dCollection.find(params).project(fields).sort(sortParams);
            return await result.toArray();
        }
        catch (err) {
            console.error(err);
        }
    }
    async count(params) {
        let rez = 0;
        (await this.query(params, { NUMAR_PETALE: 1, _id: 0 })).forEach(element => {
            if (element.NUMAR_PETALE)
                rez = rez + element.NUMAR_PETALE;
        });
        return rez;
    }
    async update(params, param2 = {}) {
        try {
            await this.ifMongoNotOpen();
            this.dCollection = await MyMongo.db.collection(this.table);
            param2 = { $set: param2 };
            await this.dCollection.updateMany(params, param2);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    async addOne(param) {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            await dColectie.insertOne(param);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    }
    async addMany(param) {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            await dColectie.insertMany(param);
            return true;
        }
        catch (err) {
            console.error(err);
        }
    }
    async delete(params) {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            await dColectie.deleteMany(params);
            return true;
        }
        catch (err) {
            console.error(err);
        }
    }
    async ifMongoNotOpen() {
        if (MyMongo.client == undefined) {
            await MyMongo.db_connect(this.url, this.database);
        }
    }
}
exports.MyMongo = MyMongo;
//# sourceMappingURL=MyMongoDB.js.map