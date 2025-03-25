import mongoose  from "mongoose";
// import { ApiError } from "../utils/ApiError";
const DBNAME="mukesh"

const DBconnect=async()=>{
    try {
        const connectinstance=await mongoose.connect(`${process.env.MGDBURL}/${DBNAME}`)
        console.log(`connected mongodb ${connectinstance.connection.host}`)
    } catch (error) {
        console.log("error is accure ",error)
    }
}

export default DBconnect;