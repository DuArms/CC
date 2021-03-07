"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloriceleRepo = void 0;
const Floricica_1 = require("../models/Floricica");
const MyMongoDB_1 = require("./MyMongoDB");
class FloriceleRepo {
    constructor() {
        this.ObjectId = require('mongodb').ObjectId;
        this.carModel = new Floricica_1.Floare().getModelForClass(Floricica_1.Floare);
        if (FloriceleRepo.database == undefined)
            FloriceleRepo.database = new MyMongoDB_1.MyMongo("Tema2CC", "Floricele");
    }
    //GET
    getAll(fields = {}) {
        return FloriceleRepo.database.query({}, fields);
    }
    getById(id) {
        return FloriceleRepo.database.query(this.ObjectId(id));
    }
    getBy(input, field = {}, sort = {}) {
        return FloriceleRepo.database.query(input, field, sort);
    }
    getCount(input) {
        return FloriceleRepo.database.count(input);
    }
    //POST
    addOne(newCar) {
        return FloriceleRepo.database.addOne(newCar);
    }
    addMany(newCars) {
        return FloriceleRepo.database.addMany(newCars);
    }
    update(queryParams, document) {
        return FloriceleRepo.database.update(queryParams, document);
    }
    //DELETE
    delete(input) {
        return FloriceleRepo.database.delete(input);
    }
}
exports.FloriceleRepo = FloriceleRepo;
//# sourceMappingURL=FloriceleRepo.js.map