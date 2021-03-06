import {Floare} from "../models/Floricica";
import {Typegoose} from 'typegoose';


export class MyMongo<T extends Typegoose> {                      //clasa templetizata ce implementeaza functiile pentru accesul o tablea din BD

    private readonly url;// 'mongodb://localhost:27017'
    private readonly database: string;
    private readonly table: string;
    private static client;
    private static db;
    private dCollection;

    constructor(database: string, table: string) {
        this.database = database;
        this.table = table;
        this.url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    }

    public static async init(database: string) {
        let url = process.env.MONGOLAB_URI || ' mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        await MyMongo.db_connect(url, database);
    }

    private static async db_connect(url, database) {
        let MongoClient = require('mongodb').MongoClient;
        if (MyMongo.client == undefined) {
            MyMongo.client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});//eventual de scos "useUnifiedTopology: true"
            MyMongo.db = MyMongo.client.db(database);
        }
    }

    public async query<T>(params, fields = {}, sortParams = {}): Promise<T[]> {
        if (params.nu_fa_nimic === "adevarat") {
            return [];
        }
        try {
            await this.ifMongoNotOpen();
            this.dCollection = await MyMongo.db.collection(this.table);
            let result = await this.dCollection.find(params).project(fields).sort(sortParams);
            return await result.toArray();
        } catch (err) {
            console.error(err);
        }

    }

    public async count(params): Promise<Number> {
        let rez = 0;
        (await this.query<Floare>(params, {NUMAR_PETALE: 1, _id: 0})).forEach(element => {
            if (element.NUMAR_PETALE)
                rez = rez + element.NUMAR_PETALE;
        });
        return rez;
    }

    public async update(params, param2 = {}): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            this.dCollection = await MyMongo.db.collection(this.table);
            param2 = {$set : param2}
            await this.dCollection.updateMany(params, param2);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }

    }

    public async addOne(param: T): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);

            await dColectie.insertOne(param);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }

    }

    public async addMany(param: T[]): Promise<boolean> {

        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            await dColectie.insertMany(param);
            return true;
        } catch (err) {
            console.error(err);
        }

    }


    public async delete(params): Promise<boolean> {
        try {
            await this.ifMongoNotOpen();
            let dColectie = MyMongo.db.collection(this.table);
            await dColectie.deleteMany(params);
            return true;
        } catch (err) {
            console.error(err);
        }

    }

    private async ifMongoNotOpen() {
        if (MyMongo.client == undefined) {
            await MyMongo.db_connect(this.url, this.database)
        }
    }


}