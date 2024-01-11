import mongoose from "mongoose";
import Story from "../models/storyContent.js";

const getStories = async (req, res) => {
    try {
        const story = await Story.find();
        res.status(200).json(story);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createStory = async (req, res) => {

    const body = req.body;

    console.log("Received data: ", body);

    const newStory = new Story({
        ...body
    });

    try {
       await newStory.save(); 
       console.log("Story saved Successfully");
       res.status(201).json(newStory);
    } catch (error) {
        console.error("Error saving story: ", error.message);
        res.status(409).json({ message: error.message });
    }
}

export { getStories, createStory };