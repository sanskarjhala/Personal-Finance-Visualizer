const express = require("express")
const mongoose  = require("mongoose")
const cors = require("cors")
const transactions = require("./routes/transactions")
const budgetRoutes = require("./routes/budgetRoutes")
require('dotenv').config()


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then("DataBase Connected Succesfully")
.catch(e => {
    console.log("Database connection falied"),
    console.log(e.message)
})

app.use("/api/transactions" , transactions )
app.use("/api/budget" ,budgetRoutes )

const port = process.env.PORT | 4000 ;

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`)
})