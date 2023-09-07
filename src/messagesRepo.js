const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.URL;
const dbName = process.env.DB_NAME;

async function getMessages(filter, sort, limit, skip) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const cursor = db.collection('Messages')
            .find(filter)
            .sort(sort)
            .limit(parseInt(limit))
            .skip(parseInt(skip));
        const result = await cursor.toArray();
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

async function addMessages(messagesToSave) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('Messages')
            .insertMany(messagesToSave);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}


async function deleteMessages(filters) {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('Messages')
            .deleteMany(filters);
        return result;
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

module.exports = { getMessages, addMessages, deleteMessages }
