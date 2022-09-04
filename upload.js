var XLSX = require("xlsx");
const productModel=require("./model/productModel")
const { default: mongoose } = require('mongoose');
var workbook = XLSX.readFile("product_list.xlsx");
var sheet_name_list = workbook.SheetNames;
//console.log(sheet_name_list); // getting as Sheet1
var data = [];
sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  //getting the complete sheet
  // console.log(worksheet);

  var headers = {};
  
  for (z in worksheet) {
    if (z[0] === "!") continue;
    //parse out the column, row, and value
    var col = z.substring(0, 1);
    // console.log(col);

    var row = parseInt(z.substring(1));
    // console.log(row);

    var value = worksheet[z].v;
   //  console.log(value);

    //store header names
    if (row == 1) {
      headers[col] = value;
      // storing the header names
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
 // console.log(data);
})
//console.log(data)
for(let i=0;i<data.length;i++){
    //console.log(data[i]["product_code"])
    let freq={}
    freq["title"]=data[i]["product_code"]
    console.log(freq)
}

async function connect(){ 
    await mongoose.connect('mongodb+srv://sankalesh8668:790602030305@cluster0.pymsd.mongodb.net/Assignment', {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )}
connect()

async function upload(data){

try{
    for(let i=0;i<data.length;i++){
     let document={}
     document["title"]=data[i]["product_code"]
     await productModel.create(document)
      
 }
}
catch (error){
   console.log(error.message)
}
}
upload(data)