const categoryModel=require("../model/categoryModel")
const productModel=require("../model/productModel")
const creatorModel=require("../model/creatorModel")
const awsController=require("./awsController")

let updatePrice = async function (req, res) {
    try {
        let data = req.body
        let producttitle=req.params.title
        if (!data.price) { return res.status(400).send({ status: false, msg: "Add Product price" }) }
     
        if (!data.category) { return res.status(400).send({ status: false, msg: "Add Product category" }) }

        if (!data.createdBy) { return res.status(400).send({ status: false, msg: "Add Product creator" }) }

        if (!data.slug) { return res.status(400).send({ status: false, msg: "Add slug" }) }
        data.price=+data.price
        if(!data.image){data.image=""}
        let files=req.files
        if(files.length!==0){
            data.image=await awsController.uploadFile(files[0])
        }
        if(!data.description){data.description=""}
        let checkTitle = await productModel.findOne({title:producttitle}); 
    if (!checkTitle) {
        { return res.status(400).send({ status: false, msg: "Invalid Product Title" }) } 
    }
        let checkCategory=await categoryModel.findById(data.category)
        if(!checkCategory){return res.status(400).send({satus:false,msg:"Invalid category"})}

        let checkCreator=await creatorModel.findById(data.createdBy)
        if(!checkCreator){return res.status(400).send({satus:false,msg:"Invalid creator"})}


        let updateDocument= await productModel.findOneAndUpdate(
            {title:producttitle},
            {$set:{price:data.price,category:data.category,createdBy:data.createdBy,image:data.image,slug:data.slug,description:data.description}},
            {new:true}
        )
        res.status(200).send({ msg:"sucess",data:updateDocument})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}


const getProductById = async function (req, res) {
    try {
      let data = req.params.productId;
  
      let product= await productModel.findOne({title:data}).populate("createdBy").populate("category")
      if(!product) return res.status(404).send({stats:false,message:"No Product found"})
     
     let responseProduct={
        _id:product.id,
        title:product.title,
        price:product.price,
        category:{
            _id:product.category._id,
            name:product.category.name,
            slug:product.category.slug
        },
        description:product.description,
        createdBy:{
            role:product.createdBy.role,
            _id:product.createdBy._id,
            name:product.createdBy.name
        },

        createdAt:product.createdAt,
        updatedAt:product.updatedAt,
        slug:product.slug,
        image:product.image
     }

      console.log(responseProduct)
      
      res.status(200).send({status:200,data:responseProduct,message:"Sucess! Product found",})
      
     
    } catch (error) {
      res.status(500).send({ status: false, msg: error.message });
    }
  };


module.exports = {updatePrice,getProductById }