const categoryModel=require("../model/categoryModel")




let createCategory = async function (req, res) {
    try {
        let data = req.body
      
        if (!data.name) { return res.status(400).send({ status: false, msg: "Add category name" }) }
        if (!data.slug) { return res.status(400).send({ status: false, msg: "Add slug" }) }
        
        const duplicate = await categoryModel.findOne({ name: data.name })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "Creator ALREADY EXISTS" })
        }
        
        //LOGIC
        let save = await categoryModel.create(data)
        res.status(200).send({ msg: save })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { createCategory }





