import mongoose from "mongoose";

const connect = async () => {
  const res = await mongoose.connect("mongodb://127.0.0.1:27017/bookDB");
  if (res) {
    console.log("connected to mongodb");
  }
};

export default connect;
