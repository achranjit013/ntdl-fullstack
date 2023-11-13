import mongoose from "mongoose";

// const mongo_url = "mongodb://127.0.0.1:27017/ntdl_db";
// const mongo_url = "mongodb://127.0.0.1:27017/ntdl_db";
// mongodb+srv://achranjit013:<password>@cluster0.0p6pq0w.mongodb.net/?retryWrites=true&w=majority

export const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};
