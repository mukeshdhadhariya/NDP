import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path:'./env'
})

connectDB()
.then(
    app.listen(process.env.PORT || 8000,"0.0.0.0",()=>{
        console.log("server is listiong on 8000 port")
    })
)
.catch((err)=>{
    console.log("Mongodb connection faield",err);
})
