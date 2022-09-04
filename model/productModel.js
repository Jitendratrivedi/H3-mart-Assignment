const mongoose = require('mongoose')
//Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProductSchema = new mongoose.Schema({
	title: { type: String, trim :true },
	price: { type: Number,trim :true },
    category: { type: ObjectId,ref:"Category"},
    description:{type:String,default:""},
    createdBy:{type:ObjectId,ref:"Creator"},
    slug:{type:String},
    image:{type:String,default:""},
},{timestamps:true})

module.exports = mongoose.model('Product',ProductSchema)




