require('dotenv').config(); // Load environment variables from .env

const { MongoClient } = require('mongodb');

// Use the URI from .env
const client = new MongoClient(process.env.MONGO_URI); 

console.log("Testing connection...");

const doctor = {
    name: "Dr. Jane Doe",
    email: "jane.doe@example.com",
    contact: "+1234567890",
    password: "hashed_password_here", // Use a hashed password
    designation: "Pediatrician"
};

async function run() {
    try {
        await client.connect(); // Connect to the MongoDB cluster
        console.log("Connected to MongoDB");

        const database = client.db('healthcare'); // Replace with your database name
        const doctors = database.collection('doctors'); // Access the doctors collection

        const result = await doctors.insertOne(doctor); // Insert the doctor
        console.log(`New doctor created with the following id: ${result.insertedId}`);
    } catch (error) {
        console.error('Error inserting doctor:', error);
    } finally {
        await client.close(); // Close the connection
        console.log("Connection closed");
    }
}

run().catch(console.dir);
