import mongoose from 'mongoose';
const { Schema } = mongoose;

interface U_projectDocument extends mongoose.Document {
    id:string,
    name:string,
    status:string,
    type:string,
    createdOn:Date,
    archived:boolean
}

const projectSchema:mongoose.Schema<U_projectDocument> = new Schema({
    id:String,
    name:String,
    status:String,
    type:String,
    createdOn:Date,
    archived:Boolean
},{strict:true,collection:'project'});

export {projectSchema};
export type {U_projectDocument};