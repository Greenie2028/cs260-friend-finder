const { MongoClient } = require('mongodb');
const config = require('./dbconfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('friendfinder');

async function connectToDatabase() {
    await client.connect();
    console.log('Connected to MongoDB');
}

connectToDatabase().catch(console.error);

async function getUser(field, value) {
    return db.collection('users').findOne({ [field]:value });
}