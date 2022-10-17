import mongoose from 'mongoose';
const { Schema } = mongoose;

interface U_userDocument extends mongoose.Document {
    username:string,
    password:string,
    joinDate:Date,
    email:{
        value:string,
        origin:string,
        verify:Boolean
    },
    phone:{
        value:string,
        countryCode:string,
        verify:boolean
    },
    token:string
}

const userSchema:mongoose.Schema<U_userDocument> = new Schema({
    username:String,
    password:String,
    joinDate:Date,
    email:{
        value:String,
        origin:String,
        verify:Boolean
    },
    phone:{
        value:String,
        countryCode:String,
        verify:Boolean
    },
    token:String
},{strict:true,collection:'users'});

export default userSchema;