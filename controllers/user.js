const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pino = require('pino-http');

const jwtSecret = process.env.JWT_SECRET;



const UserCont = {
    //create user
    registerUser: async (req, res) => {
        try {
            const {username, password, role } = req.body;
            // const hashedPassword = await bcrypt.hash(password, 10);
            if (!username || !password || !role){
                req.log.info('something')
                return res.status(400).json({error: 'invalid credentials'});
            }
            const existingUser = await User.findOne({username});
            if(existingUser) {
                return res.status(400).json({error: 'User already exists'});
                // req.log.info('something')
            }
                const newUser = await User.create({ username, password/*:hashedPassword */, role});

                res.status(201).json({
                    message: 'User Created',
                    user: {
                        id: newUser._id,
                        username: newUser.username,
                        role: newUser.role
                    }
                    
                });
            } catch (error) {
            console.log('Omo the Struggle', error);
        }
    },

    // login user
    loginUser: async (req, res) => {
        try {
            const {username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'User and password are required'});
            }

            //find user
            const user = User.findOne({ username });
            if (!user) {
                res.status(400).json({error: 'Invalid credentials'});
            }

            //compare password
            const isMatch =  await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials'});
            }
            res.status(200).json({ message: 'Login successful'});

            const token = jwt.sign({ userId: user._id}, jwtSecret);
            res.cookie('token', token);
           
        } catch (error) {
         console.log('Just dey play', error);
        }
    }
};

module.exports = UserCont;

