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
    await channel.assertQueue("ORDER");
  }
function createOrder(products,userEmail) {
    let total = 0;
    for (let t=0;t<products.length;++t){
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        uset: userEmail,
        total_price: total
    })
    newOrder.save()
    return newOrder
}

connect().then(() => {
    channel.consume("ORDER" , data => {
        const { products, userEmail} = JSON.parse(data.content)
        const newOrder = createOrder(products, userEmail)
        channel.ack(data)
        channel.sendToQueue("PRODUCT",Buffer.from(JSON.stringify({newOrder})))
        console.log("Consuming the ORder Queue");
        console.log(products);
    })
})
app.listen(PORT, () => {
    console.log(`order service is running at ${PORT}`);
})