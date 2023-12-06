import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("Missing MongoDB URL");

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {

    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true; // Set the connection status to true
  } catch (error) {
    console.log("Error connecting to MongoDB");
    console.log(error);
  }
};
