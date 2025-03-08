const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mpvijayakumar88:Password123@cluster23.ztn2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster23';
const client = new MongoClient(uri);

async function checkConnection() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection failed', error);
    } finally {
        await client.close();
    }
}

checkConnection();
