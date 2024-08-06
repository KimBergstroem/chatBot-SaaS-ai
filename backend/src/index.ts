import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { SERVER_PORT, SUCCESS_MESSAGES } from "./utils/constants.js";

// Connections and listeners
const PORT = SERVER_PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`${SUCCESS_MESSAGES.OK} - Server is running on port ${PORT}`)
    );
  })
  .catch((error) => console.error("Database connection error:", error.message));
