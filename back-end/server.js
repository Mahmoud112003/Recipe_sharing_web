const express = require("express");

require("dotenv").config( {path: "./config.env" });
const connectDB = require("./config/db");

const ApplevelMiddleware = require("./middlewares/Applevel.middleware");
const errorHandler = require("./middlewares/errhandle.middleware");

const userRoutes = require("./routes/user.route");
const recipeRoutes = require("./routes/recipe.route");
const cors = require("cors")



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:4200"
}))

let databaseReady;
app.use(async (req, res, next) => {
    try {
        if (!databaseReady) databaseReady = connectDB().catch((error) => {
            databaseReady = undefined;
            throw error;
        });
        await databaseReady;
        next();
    } catch (error) {
        next(error);
    }
});

app.use(express.json());

app.use(ApplevelMiddleware);

app.get("/", (req, res) => {
    res.json({
        message: "Recipe Sharing API is running",
        endpoints: {
            auth: "/auth",
            recipes: "/recipes"
        }
    });
});


app.use("/auth", userRoutes);

app.use("/recipes", recipeRoutes);



app.use(errorHandler);


const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
