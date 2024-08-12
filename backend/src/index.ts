import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import { SUCCESS_MESSAGES } from "./utils/constants.js";

// Dynamic port assignment
const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`${SUCCESS_MESSAGES.OK} - Server is running on port ${PORT}`)
    );
  })
  .catch((error) => console.error("Database connection error:", error.message));
