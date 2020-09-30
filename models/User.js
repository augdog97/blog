
/* This file creates the Databse model which includes the scema which is how the collection in the database will look */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
var uniqueValidator = require('mongoose-unique-validator');



/*  
using config objects to apply specific requirments to the database.
user name is required and is unique, this means that no two people can register the same user name
password is just required
*/
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        /**Custon error message */
        required: [true, 'Please provide a username']
    }, 
    password: {
        type: String, 
        required: [true, 'Please Provide a password']
    }
});

UserSchema.plugin(uniqueValidator);

/* 
1. .pre, before we save anything to the database run the function as the second argument. 
2. user = this (the current user being created)
3. user.password, 50 => says to hash the current user password 50 times
4. The 3rd argument to .hash runs when the hash is complete.
5. Setting the user password to the resulting hash that was made.
6. call next so the database can continue to create the user data. 
*/

UserSchema.pre('save', function(next) {
    const user = this;

    bcrypt.hash(user.password, 10, (error,hash) => {
        user.password = hash;
        next()
    })
})

/* Exporting the modek and the Schema so they can be used in other files */
const User = mongoose.model('User', UserSchema);
module.exports = User;

