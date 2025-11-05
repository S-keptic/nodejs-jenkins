const express = require('express')
const app = express()
app.get('/',(req,res)=>{
    res.send("Hello from Jenkins CI/CD version 2")
})

app.listen(3000,()=>{
    console.log("Server running on Port 3000")
}) 