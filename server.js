import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import subscriberRoutes from "./routes/subscriber-routes.js";

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error",(err)=> console.error(err));
db.once("open", () => console.log(`conncted to Database`));

// app.use helps us to use any middleware we want to use
app.use(express.json())

app.use("/subscribers", subscriberRoutes);

app.listen(3000, () => console.log("server started"))