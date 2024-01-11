import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import storyRoutes from './routes/stories.js';

const app = express();

app.use(bodyParser.json({ limit: "32mb" }));
app.use(bodyParser.urlencoded({ limit: "32mb", extended: "true"}));
app.use(cors());

//setting the story routes
app.use("/stories", storyRoutes);

//copy the conect string from the mongoDB
const MONGO_URI = "mongodb+srv://instaverse:instaverse@cluster0.s9zcz2w.mongodb.net/?retryWrites=true&w=majority";

//specify the port number
const PORT = process.env.PORT || 5001;

//callback function for the DB connection
const connectDB = async () => {

    try {

        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        });

    } catch(err){
        console.error("Connection to MongoDB failed", err.message);
    }
}

//call the connection function for the connection
connectDB();

//error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Somthing went wrong!');
});

mongoose.connection.on("open", () => {console.log("Connection to the DataBase has been established Successfully")});
mongoose.connection.on("error", (err) => {console.log(err)});