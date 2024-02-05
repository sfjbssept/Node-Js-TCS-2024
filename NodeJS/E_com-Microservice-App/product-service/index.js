const express = require("express")
const app = express();
const PORT = 8080
const mongoose = require("mongoose");
const jwt= require("jsonwebtoken")
const amqp = require("amqplib")
const Product = require("./Product")
const isAuthenticated = require("../isAuthenticated")
var channel, connection;

app.use(express.json())
mongoose.connect(
    "mongodb://localhost:27017/product-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() =>{
    console.log("Mongoose is connected to product DB");
})

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
  }
connect()

// create a new product
// buy a product

app.post("/product/create" , isAuthenticated, async(req,res)=>{
    const {name, description, price} = req.body;
    const newProduct = new Product({
        name,
        description,
        price
    });
    return res.json(newProduct)

})


app.listen(PORT, () => {
    console.log(`product service is running at ${PORT}`);
})