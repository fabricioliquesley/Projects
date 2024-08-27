require("dotenv/config");
require("express-async-errors");

const AppError = require("./utils/AppError");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes");

app.use(routes);

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));