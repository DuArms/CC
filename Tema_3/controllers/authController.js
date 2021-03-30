const { StatusCodes} = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const { signToken } = require('../utils/jwt');
const { Datastore } = require('@google-cloud/datastore');
const { logger } = require('../utils/logger');
const datastore = new Datastore();

const bcrypt = require('bcrypt');
const { isEmpty } = require('lodash');
const saltRounds = 8;

const login = async function(req,res) {
    const email = req.body['email'];
    const password = req.body['password'];

    const getUserByEmail = await datastore.createQuery('Users').filter('email','=',email);
    const [users] = await datastore.runQuery(getUserByEmail);

    if(!isEmpty(users)) {
        const comparePassword = users[0]['password'];
        const uuid = users[0]['uuid'];
        bcrypt.compare(password, comparePassword, function(err, reslt) {
            if (err) {
                throw err;
            } else {
                if(reslt) {
                    const accessToken = signToken({uuid:uuid}, 'jVK63H0SJ8');
                    const response = {
                        status:'success',
                        content:{
                            access_token:accessToken,
                        },
                        message:'Authenticated successfully'
                    };

                    res.status(StatusCodes.ACCEPTED);
                    res.end(JSON.stringify(response));
                } else {    
                    const response = { 
                        status:'failed',
                        message:'User password is wrong'
                    };
                    res.status(StatusCodes.FORBIDDEN);
                    logger.error('Error( from:' + req.headers['user-agent'] +' ):' + JSON.stringify(req.body) + "\t" + JSON.stringify(response));
                    res.end(JSON.stringify(response));
                }
            }
          });
    } else {
        const response = { 
            status:'failed',
            message:'User not found'
        };
        res.status(StatusCodes.NOT_FOUND);
        logger.error('Error( from:' + req.headers['user-agent'] +' ):' + JSON.stringify(req.body) + "\t" + JSON.stringify(response));
        res.end(JSON.stringify(response));
    }
}

const register = async function(req,res) {
    
    const email = req.body['email'];
    const password = req.body['password'];

    const query = await datastore.createQuery('Users').filter('email', '=', email);
    const [users] = await datastore.runQuery(query);
    if(isEmpty(users)){
        bcrypt.hash(password, saltRounds, async (err, hashed) => {
            if (err) {
                throw err;
            } else {
                const user = {
                    uuid:uuidv4(),
                    email:email,
                    password:hashed
                }
                const response = {
                    status:'success',
                    message:'User created successfully'
                };
            
                const entity = {
                    key: datastore.key('Users'),
                    data: user
                };
                await datastore.save(entity);

                res.status(StatusCodes.CREATED);
                logger.info('Success( from:' + req.headers['user-agent'] +' ):' + JSON.stringify(req.body) + "\t" + JSON.stringify(response));
                res.end(JSON.stringify(response));
                
            }
        });
    } else {
        const response = { status:'failed',message:'User already exists in the database'};
        res.status(StatusCodes.CONFLICT);
        logger.error('Error( from:' + req.headers['user-agent'] +' ):' + JSON.stringify(req.body) + "\t" + JSON.stringify(response));
        res.end(JSON.stringify(response));
    }
    
}   

module.exports = {
    register,
    login
}