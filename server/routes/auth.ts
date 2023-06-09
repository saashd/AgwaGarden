import { Response, Request } from "express";
import User from "../models/user";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = require("express").Router();

//REGISTER
router.post("/register", async (req: Request, res: Response) => {
  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    onboarding: new Date(),
    default_plants_selection: DEMO_DATA,
    email: req.body.email,
    // Encrypt the password using CryptoJS and the password security key from the environment variables
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json("Something went wrong..");
  }
});

//LOGIN
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json("Wrong credentials!");
    } else {
      // Decrypt the password using CryptoJS and the password security key from the environment variables
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (OriginalPassword !== req.body.password) {
        res.status(401).json("Wrong credentials!");
        return;
      }
      // Generate a JWT access token using the user ID and the JWT security key from the environment variables
      //TODO: usew in the future to check if the user is active
      // const accessToken = jwt.sign(
      //   {
      //     id: user._id,
      //   },
      //   process.env.JWT_SEC,
      //   { expiresIn: "24h" }
      // );

      const { password, ...others } = user._doc;

      res.status(200).json({ ...others });
    }
  } catch (err) {
    res.status(400).json("Something went wrong..");
  }
});

module.exports = router;

const DEMO_DATA = [
  "cucumber_iznik",
  "claytonia_special",
  "parsley_celery_flavored",
  "arugula_astro",
  "lettuce_romain",
];
