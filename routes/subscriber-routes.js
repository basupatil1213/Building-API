import express from "express";
import subscriberModel from "../model/subscriber.js";

const router = express.Router();

const getSubscriber = async (req, res, next) =>{
    let subscriber;
    try {
        subscriber = await subscriberModel.findById(req.params.id);
        if (subscriber == null) {
            return res.status(404).json({message:"Cannot find a subscriber"})
        }
    } catch (err) {
        return res.status(500).json({message:err.message})
    }
    res.subscriber =  subscriber;
    next();
}
// getting all subscribers

router.get("/", async (req, res) =>{
    try{
        const subscribers =await subscriberModel.find();
        res.json(subscribers);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// getting one subscriber
router.get("/:id",getSubscriber, async (req, res) =>{
    res.json(res.subscriber);
    
});

// creating one
router.post("/",async (req, res) => {
    const subscriber = new subscriberModel({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    });

    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    
})
// updating one
router.patch("/:id",getSubscriber, (req, res) =>{
    res.send("Hello patch");
    
});
// deleting one
router.delete("/:id",getSubscriber,async (req, res) =>{
    try {
        await res.subscriber.remove();
        res.json("deleted Subscriber")
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});



export default router;