import mongoose from "mongoose";
import env from "./env.js";

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database!");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected!");
});

const connectToDb = async () => {
  try {
    if (!env.dbUrl) {
      throw new Error("DB connection string is missing!");
    }
    await mongoose.connect(env.dbUrl);
  } catch (err) {
    console.error("Unable to connect to database:", err);
    process.exit(1);
  }
};

export default connectToDb;
