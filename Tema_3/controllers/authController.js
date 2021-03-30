const { StatusCodes} = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const { signToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const saltRounds = 8;

const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();

const login = function(req,res) {
    
}

const register = function(req,res) {
    
    const email = req.body['email'];
    const password = req.body['password'];

    const query = await datastore.createQuery('Users').filter('email', '=', email);
    const [users] = await datastore.runQuery(query);

    bcrypt.hash(password, saltRounds, async (err, hashed) => {
        if (err) {
            throw err;
        } else {
            const user = {
                uuid:uuidv4(),
                email:email,
                password:hashed
            }
            const response = {status:"success",message:"User created successfully"};
           
            const entity = {
                key: datastore.key('Users'),
                data: user
            };
            await datastore.save(entity);

            res.status(StatusCodes.CREATED);
            res.end(JSON.stringify(response));
            
        }
    });
    
}   

module.exports = {
    register,
    login
}