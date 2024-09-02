import mongoose from "mongoose"

const MONGO_CLIENT = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_URL,
        { useNewUrlParser: true})
        .then(() => console.log('database connected successfully'))
        .catch(err => console.error(`database connection failed: ${err}`));
};

export default MONGO_CLIENT;