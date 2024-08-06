// Error Messages
export const ERROR_MESSAGES = {
  USER_NOT_REGISTERED: "User not registered or token malfunctioned",
  TOKEN_NOT_RECEIVED: "Token Not Received",
  INVALID_TOKEN_DATA: "Invalid token data",
  PERMISSIONS_MISMATCH: "Permissions mismatch",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  USER_ALREADY_EXISTS: "User already exists",
  USER_DOES_NOT_EXIST: "User does not exist",
  INCORRECT_PASSWORD: "Incorrect Password",
  DB_CONNECTION_FAILED: "Failed to connect to MongoDB",
  DB_DISCONNECTION_FAILED: "Failed to disconnect from MongoDB",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  OK: "OK SUCCESS",
  DB_CONNECTED: "Connected to MongoDB!",
  DB_DISCONNECTED: "Disconnected from MongoDB!",
};

// Cookie and Token Constants
export const COOKIE_NAME = "auth_token";
export const TOKEN_EXPIRATION = "7d";

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: "Email is required",
  PASSWORD_LENGTH: "Password need to be min 8 characters",
  NAME_REQUIRED: "Name is required",
  MESSAGE_REQUIRED: "Message is required",
};

// Server and Port Constants
export const SERVER_PORT = process.env.PORT || 5000;
