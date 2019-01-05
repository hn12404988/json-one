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
    if(obj === false){
      console.log("(Fail) - jsonOne fail on parsing this json string: return false");
    }
    else{
      console.log("(OK) - jsonOne successfully parsing this json string");
      console.log(JSON.stringify(obj, null, 2));
    }
  }
  catch(err){
    console.log("(Fail) - jsonOne fail on parsing this json string: exception");
    //console.error(err);
  }
  console.log("\n");
}

var main = function(){
  // Normal json string
  console.log("# Unit Testing: Normal json string");
  let jsonString = "{\"main_id\": 12, \"menu\": {\"id\": \"file\",\"value\": \"File\",\"popup\": {\"menuitem\": [{\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},{\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},{\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}]}}}";
  unitTest(jsonString);
  // Json string with extra quote at the beginning and end of elements
  console.log("# Unit Testing: Json string with extra quote at the beginning and end of elements");
  jsonString = "{\"main_id\": 12, \"menu\": \"{\"id\": \"file\",\"value\": \"File\",\"popup\": {\"menuitem\": [{\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},{\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},{\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}]}}\"}";
  unitTest(jsonString);
  // ALL Quotes are escaped properly inside sub json string
  console.log("# Unit Testing: ALL Quotes are escaped properly inside sub json string");
  jsonString = "{\"main_id\": 12, \"menu\": \"{\\\"id\\\": \\\"file\\\",\\\"value\\\": \\\"File\\\",\\\"popup\\\": {\\\"menuitem\\\": [{\\\"value\\\": \\\"New\\\", \\\"onclick\\\": \\\"CreateNewDoc()\\\"},{\\\"value\\\": \\\"Open\\\", \\\"onclick\\\": \\\"OpenDoc()\\\"},{\\\"value\\\": \\\"Close\\\", \\\"onclick\\\": \\\"CloseDoc()\\\"}]}}\"}";
  unitTest(jsonString);
  // Sub element is a json object, but all the quotes inside are escaped
  console.log("# Unit Testing: Sub element is a json object, but all the quotes inside are escaped");
  jsonString = "{\"main_id\": 12, \"menu\": {\\\"id\\\": \\\"file\\\",\\\"value\\\": \\\"File\\\",\\\"popup\\\": {\\\"menuitem\\\": [{\\\"value\\\": \\\"New\\\", \\\"onclick\\\": \\\"CreateNewDoc()\\\"},{\\\"value\\\": \\\"Open\\\", \\\"onclick\\\": \\\"OpenDoc()\\\"},{\\\"value\\\": \\\"Close\\\", \\\"onclick\\\": \\\"CloseDoc()\\\"}]}}}";
  unitTest(jsonString);
}

if (require.main === module) {
  main();
}
