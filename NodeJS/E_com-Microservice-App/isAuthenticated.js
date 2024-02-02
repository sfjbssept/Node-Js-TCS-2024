const jwt = require("jsonwebtoken")

export async function isAuthenticated(req,res,next) {
    const token = req.header["authorization"].split(" ")[1];
    // "Bearer <token>.split(" ")

    //verify
jwt.verify(token, "secret",(err,user) => {
    if(err) {
        return res.json({message:err})
    } else {
        req.user = user
        next()
    }
})

}