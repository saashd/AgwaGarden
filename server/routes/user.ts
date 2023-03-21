import {Response, Request} from "express"
import User from "../models/user";

const router = require("express").Router();

//TODO: Add a middleware to check if the user is authorized to access this route.
//UPDATE DEFAULT SELECTION
router.put("/:id/default", async (req:Request, res:Response) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    default_plants_selection:req.body.default_plants_selection,  
                },
            },
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json("Something went wrong..");
    }
});

module.exports = router;

//TODO: ADD UPDATE USER, DELETE USER, etc

