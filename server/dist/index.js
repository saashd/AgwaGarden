"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoute = require("./routes/auth");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.get('/', (req, res) => {
    res.send('Welcome to server');
});
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
    console.log(err);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/auth", authRoute);
app.listen(5000, () => {
    console.log("Backend server is running");
});
