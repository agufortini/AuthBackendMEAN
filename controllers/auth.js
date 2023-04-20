const { response } = require('express'); //Typing specification
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { JwtGenerate } = require('../helpers/jwt');

// Create a new user
const createUser = async(req, res = response) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //Verify that not exist an email
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'The user entered, already exists'
            })
        }

        //Create an user with model
        const dbUser = new User(req.body);

        //Encrypt the password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //JSONWebToken generate
        const token = await JwtGenerate(dbUser.id, dbUser.name);

        //Create an db user
        await dbUser.save();

        //Generate a succesfull response 
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Something went wrong. Communicate with the system area to solve the problem'
        });
    }
}

const userLogin = (req, res = response) => {
    const { email, password } = req.body;
    return res.json({
        ok: true,
        msg: 'User login'
    });
}

const renewToken = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'Renew'
    });
}

module.exports = {
    createUser,
    userLogin,
    renewToken
}