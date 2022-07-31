import mongoose, { connect } from "mongoose";

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState === 1) {
      console.log("database connected");
    }
  } catch (errors) {
    return Promise.reject(errors);
  }
};

export default connectMongo;
