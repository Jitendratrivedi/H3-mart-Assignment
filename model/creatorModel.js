const mongoose = require('mongoose')
//Schema
const creatorSchema = new mongoose.Schema({
	role: { type: String, trim :true },
	name: { type: String,trim :true },
	
})

module.exports = mongoose.model('Creator',creatorSchema)




