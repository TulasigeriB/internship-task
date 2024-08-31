import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Create a MongoClient instance with environment variables
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to connect to MongoDB
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

// Export the MongoClient instance for use in other parts of the application
export default client;
