import mongoose from "mongoose";

const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string

if (!uri) {
  throw new Error("MongoDB connection string is missing.");
}

const connection = {};

if (!connection.isConnected) {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = mongoose.connections[0].readyState;
}

export default connection;
