const { MongoClient, ServerApiVersion } = require('mongodb');

const falshfiles = () => {
    const DB_URI = process.env.Flash_File
    const client = new MongoClient(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const users = client.db("flashfiles").collection("users")
    const files = client.db("flashfiles").collection("files")
    async function run() {
        await client.connect()
        console.log('Flash File Database Connected')

    }
    run().catch(console.dir())


    return { users, files }

}

module.exports = falshfiles