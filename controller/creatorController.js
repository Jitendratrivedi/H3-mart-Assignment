const creatorModel=require("../model/creatorModel")




let creator = async function (req, res) {
    try {
        let data = req.body
        

        // VALIDATION
       
        if (!data.role) { return res.status(400).send({ status: false, msg: "Add title" }) }
        if (!data.name) { return res.status(400).send({ status: false, msg: "Add username" }) }
        
        const duplicate = await creatorModel.findOne({ name: data.name })
        if (duplicate) {
            return res.status(400).send({ status: false, msg: "Name already exists try different one" })
        }
        
        //LOGIC
        let save = await creatorModel.create(data)
        res.status(200).send({ msg: save })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}


module.exports = { creator }





