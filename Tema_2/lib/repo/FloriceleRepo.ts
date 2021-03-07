import { Floare } from "../models/Floricica";
import { MyMongo } from "./MyMongoDB";

export class FloriceleRepo {                      //clasa ce implementeaza functiile pentru accesul la tabela Car
    private readonly ObjectId;
    private carModel;
    private static database: MyMongo<Floare>;
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.carModel = new Floare().getModelForClass(Floare);
        if (FloriceleRepo.database == undefined)
            FloriceleRepo.database = new MyMongo("Tema2CC", "Floricele");
    }
    //GET
    public getAll(fields = {}): Promise<Floare[]> {
        return FloriceleRepo.database.query<Floare>({},fields);
    }

    public getById(id): Promise<Floare[]> {
        return FloriceleRepo.database.query<Floare>(this.ObjectId(id));
    }

    public getBy(input, field = {}, sort = {}): Promise<Floare[]> {
        return FloriceleRepo.database.query(input, field, sort);
    }

    public getCount(input): Promise<Number> {
        return FloriceleRepo.database.count(input);
    }


    //POST
    public addOne(newCar): Promise<boolean> {
        return FloriceleRepo.database.addOne(newCar)
    }

    public addMany(newCars: Floare[]): Promise<boolean> {
        return FloriceleRepo.database.addMany(newCars)
    }

    public update(queryParams: any, document: any): Promise<boolean> {
        return FloriceleRepo.database.update(queryParams, document);
    }

    //DELETE
    public delete(input): Promise<boolean> {
        return FloriceleRepo.database.delete(input);
    }


}