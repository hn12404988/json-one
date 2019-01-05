var jsonOne = require('./json_one.js');
let tool = new jsonOne();

var unitTest = function(jsonString){
  console.log("\n/**************** JSON String ******************/")
  console.log(jsonString);
  console.log("/***********************************************/")
  try{
    JSON.parse(jsonString);
    console.log("(OK) - Build-in JSON.parse() successfully parsing this json string");
  }
  catch(err){
    console.log("(Fail) - Build-in JSON.parse() fail on parsing this json string");
  }
  try{
    let obj = tool.to_object(jsonString);
    console.log("(OK) - jsonOne successfully parsing this json string");
    console.log(JSON.stringify(obj, null, 2));
  }
  catch(err){
    console.log("(Fail) - jsonOne fail on parsing this json string");
  }
  console.log("\n");
}

var main = function(){
  // Normal json string
  let jsonString = "{\"menu\": {\"id\": \"file\",\"value\": \"File\",\"popup\": {\"menuitem\": [{\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},{\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},{\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}]}}}";
  unitTest(jsonString);
  // Json string with extra quote at the beginning and end of elements
  jsonString = "{\"menu\": \"{\"id\": \"file\",\"value\": \"File\",\"popup\": {\"menuitem\": [{\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},{\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},{\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}]}}\"}";
  unitTest(jsonString);
}

if (require.main === module) {
  main();
}
