const express = require("express")
const app = express();
const PORT = 9090
const mongoose = require("mongoose");
const jwt= require("jsonwebtoken")
const amqp = require("amqplib")
const Order = require("./Order")
const isAuthenticated = require("../isAuthenticated")
var channel, connection;

app.use(express.json())
mongoose.connect(
    "mongodb://localhost:27017/order-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() =>{
    console.log("Mongoose is connected to Order DB");
})

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
  }
connect()
app.listen(PORT, () => {
    console.log(`order service is running at ${PORT}`);
})