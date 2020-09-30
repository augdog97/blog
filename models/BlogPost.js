
/* This file creates the Databse model which includes the scema which is how the collection in the database will look */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Each blog post will have a title and the body which will be strings */

/** Connecting user accounts to the posts that they make
 * userid object: setting the type to the value is supposed to be a valid mongo object id
 * ref is set to the User Collection where the user documents are contained
 * The blogpost and user collections are not connected
 */
const BlogPostSchema = new Schema ({
    title: String,
    body: String,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

/* Exporting the modek and the Schema so they can be used in other files */ 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;