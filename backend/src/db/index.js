import mongoose  from "mongoose";
const DBNAME="mukesh"

const DBconnect=async()=>{
    try {
        const connectinstance=await mongoose.connect(`${process.env.MGDBURL}/${DBNAME}?retryWrites=true&w=majority`)
        console.log(`connected mongodb ${connectinstance.connection.host}`)
    } catch (error) {
        console.log("error is accure ",error)
    }
}

export default DBconnect;