const { MongoClient, ServerApiVersion } = require('mongodb');

const falshfiles = () => {
    const DB_URI = process.env.Flash_File
    const flash = new MongoClient(DB_URI);
    const users = flash.db("flashfiles").collection("users")
    const files = flash.db("flashfiles").collection("files")
   


    return { users, files, flash }

}

module.exports = falshfiles