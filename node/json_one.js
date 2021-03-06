"use strict";

module.exports = class jsonOne{
  constructor(){
    this.i = 0;
    this.j = 0;
    this.str = "";
    this.outcome = "";
  }

  json_to_end(jsonString){
    this.i++;
    while(jsonString[this.i] !== undefined){
      if(jsonString[this.i] == '}'){
        return;
      }
      else if(jsonString[this.i] == '['){
        this.array_to_end(jsonString);
      }
      else if(jsonString[this.i] == '{'){
        this.json_to_end(jsonString);
      }
      this.i++;
    }
  }

  array_to_end(jsonString){
    this.i++;
    while(jsonString[this.i] !== undefined){
      if(jsonString[this.i] == ']'){
        return;
      }
      else if(jsonString[this.i] == '['){
        this.array_to_end(jsonString);
      }
      else if(jsonString[this.i] == '{'){
        this.json_to_end(jsonString);
      }
      this.i++;
    }
  }

  ignore_space(jsonString){
    while(jsonString[this.i] === ' '){
      this.i++;
    }
  }

  to_object(jsonString) {
    var ss = {};
    if(jsonString == "" || jsonString == "{}"){
      return ss;
    }
    this.i = 1;
    this.ignore_space(jsonString);
    while(jsonString[this.i] !== undefined){
      if(jsonString[this.i] !== '"'){
        return false;
      }
      this.j = this.i + 1;
      for(;jsonString[this.i] !== undefined; this.i++){
        if(jsonString[this.i] == ':'){
          break;
        }
      }
      this.str = jsonString.substr(this.j, this.i - this.j - 1);
      this.i++;
      this.ignore_space(jsonString);
      this.j = this.i;
      if(jsonString[this.i] == '{'){
        this.json_to_end(jsonString);
        if(jsonString[this.i] !== '}'){
          return false;
        }
        this.outcome = jsonString.substr(this.j, this.i - this.j + 1);
      }
      else if(jsonString[this.i] == '['){
        this.array_to_end(jsonString);
        if(jsonString[this.i] !== ']'){
          return false;
        }
        this.outcome = jsonString.substr(this.j, this.i - this.j + 1);
      }
      else if(jsonString[this.i] == '"'){
        this.i++;
        this.j++;
        for(;jsonString[this.i] !== undefined;this.i++){
          if(jsonString[this.i] == '['){
            this.array_to_end(jsonString);
            if(jsonString[this.i] !== ']'){
              return false;
            }
            continue;
          }
          if(jsonString[this.i] == '{'){
            this.json_to_end(jsonString);
            if(jsonString[this.i] !== '}'){
              return false;
            }
            continue;
          }
          if(jsonString[this.i] === '"' && jsonString[this.i] !== '\\'){
            break;
          }
        }
        this.outcome = jsonString.substr(this.j, this.i - this.j);
      }
      else{
        while(jsonString[this.i] !== ',' && jsonString[this.i] !== undefined){
          this.i++;
        }
        this.i--;
        if(this.j === this.i){
          return false;
        }
        this.outcome = jsonString.substr(this.j, this.i - this.j + 1);
        try{
          this.outcome = parseInt(this.outcome);
        }
        catch(err){}
      }
      ss[this.str] = this.outcome;
      if(jsonString[this.i + 1] === '}'){
        break;
      }
      else if(jsonString[this.i + 1] === ','){
        this.i += 2;
        this.ignore_space(jsonString);
      }
    }
    return ss;
  }
}
