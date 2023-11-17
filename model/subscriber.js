import mongoose from "mongoose";

const subscriberSchems = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subscriberToChannel:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: false,
        default: Date.now
    }
});

const subscriberModel = mongoose.model("subscriber",subscriberSchems);
export default subscriberModel;