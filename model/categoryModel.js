const mongoose = require('mongoose')
//Schema
const categorySchema = new mongoose.Schema({
	
	name: { type: String,trim :true },
    slug: { type: String, trim :true },
	
})

module.exports = mongoose.model('Category',categorySchema)




