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

async function createUser(email, passwordHash, name, city, hobbies) {
    const user = { email, password: passwordHash, name, city, hobbies: hobbies || '', token: null};
    await db.collection('users').insertOne(user);
    return user;
}

async function updateUser(email, updates) {
    await db.collection('users').updateOne({ email }, { $set: updates });
    return db.collection('users').findOne({ email });
}