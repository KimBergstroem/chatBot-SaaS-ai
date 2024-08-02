import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
}

async function disconnectedFromDatabase() {
  try {
    await disconnect();
    console.log("Disconnected from MongoDB!");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB:", error.message);
  }
}

export { connectToDatabase, disconnectedFromDatabase };
