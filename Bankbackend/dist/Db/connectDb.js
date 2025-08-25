"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://vigneshxoo:cFwOcJZF6pIfZsRp@cluster0.kyslpql.mongodb.net/?retryWrites=true&w=majority&appName=clientbank";
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log(" MongoDB connected");
    }
    catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connectDb.js.map