import { connect, disconnect } from "mongoose";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../utils/constants.js";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log(SUCCESS_MESSAGES.DB_CONNECTED);
  } catch (error) {
    console.error(`${ERROR_MESSAGES.DB_CONNECTION_FAILED}: ${error.message}`);
  }
}

async function disconnectedFromDatabase() {
  try {
    await disconnect();
    console.log(SUCCESS_MESSAGES.DB_DISCONNECTED);
  } catch (error) {
    console.error(
      `${ERROR_MESSAGES.DB_DISCONNECTION_FAILED}: ${error.message}`
    );
  }
}

export { connectToDatabase, disconnectedFromDatabase };
