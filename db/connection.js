const uri = "mongodb+srv://2019raksha:8LyZBytAKKRJ3Hjn@cluster0.drtqlq4.mongodb.net/";


import { MongoClient } from "mongodb";

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db("Inferno_Coders");
    console.log('Connected to the Inferno_Coders database');
    return db;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err; // Rethrow the error to handle it elsewhere if needed
  }
};

export default connectToDatabase;
