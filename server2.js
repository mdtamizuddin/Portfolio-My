
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors())
app.use(bodyParser.json())

const uri = `mongodb+srv://linear-graphic:7tfQa8horkvX1ept@cluster0.fcnm4.mongodb.net/?retryWrites=true&w=majority
`;
const client = new MongoClient(uri);
const portfolio = client.db("linear-graphic").collection("portfolios")
const pricing = client.db("linear-graphic").collection("pricings")
const titles = client.db("linear-graphic").collection("titles")
const users = client.db("linear-graphic").collection("users")
const genarelps = client.db("linear-graphic").collection("genarelps")
// Routes for bangla Website 



const titleBangla = client.db("linear-graphic").collection("banglatitles")
const portfolioBD = client.db("linear-graphic").collection("portfolios-bd")
const pricing2 = client.db("linear-graphic").collection("pricings2")
const genarelpsBD = client.db("linear-graphic").collection("genarelps-bd")
const linearServer = () => {
    return {
        client, portfolio, titles, pricing, users, genarelps, titleBangla, pricing2
        , portfolioBD, genarelpsBD
    }

}

module.exports = linearServer