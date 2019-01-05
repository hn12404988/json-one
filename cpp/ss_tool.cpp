inline void ss_tool::json_to_end(std::string &json){
	++i;
	while(json[i]!='\0'){
		if(json[i]=='}'){
			return;
		}
		else if(json[i]=='['){
			array_to_end(json);
		}
		else if(json[i]=='{'){
			json_to_end(json);
		}
		++i;
	}

}

inline void ss_tool::array_to_end(std::string &array){
	++i;
	while(array[i]!='\0'){
		if(array[i]==']'){
			return;
		}
		else if(array[i]=='['){
			array_to_end(array);
		}
		else if(array[i]=='{'){
			json_to_end(array);
		}
		++i;
	}
}

inline void ss_tool::escape(std::string &line){
	j = line.length();
	if(line[0]=='"'){
		line = '\\'+line;
		i = 2;
		++j;
	}
	else{
		i = 1;
	}
	for(;i<j;++i){
		if(line[i]=='"' && line[i-1]!='\\'){
			line.insert(i,"\\");
			++i;
			++j;
		}
	}
}

void ss_tool::to_json(hej::SS &ss){
	outcome  = "{";
	it = ss.begin();
	it_end = ss.end();
	if(escape_quote==true){
		for(;it!=it_end;++it){
			escape(it->second);
		}
		it = ss.begin();
	}
	if(all_quote==true){
		for(;it!=it_end;++it){
			outcome = outcome+"\""+it->first+"\":\""+it->second+"\",";
		}
	}
	else{
		for(;it!=it_end;++it){
			if(it->second[0]=='{' || it->second[0]=='['){
				outcome = outcome+"\""+it->first+"\":"+it->second+",";
			}
			else{
				outcome = outcome+"\""+it->first+"\":\""+it->second+"\",";
			}
		}
	}
	if(outcome!="{"){
		outcome.pop_back();
		outcome.append("}");
	}
	else{
		outcome = "{}";
	}
}

bool ss_tool::json_to(hej::SS &ss,std::string &json){
	ss.clear();
	if(json=="" || json=="{}"){
		return true;
	}
	i = 1;
	while(json[i]!='\0'){
		if(json[i]!='"'){
			return false;
		}
		j = i+1;
		for(;json[i]!='\0';++i){
			if(json[i]==':'){
				break;
			}
		}
		str = json.substr(j,i-j-1);
		++i;
		while(json[i] == ' '){
			++i;
		}
		j = i;
		if(json[i]=='{'){
			json_to_end(json);
			if(json[i]!='}'){
				return false;
			}
			outcome = json.substr(j,i-j+1);
		}
		else if(json[i]=='['){
			array_to_end(json);
			if(json[i]!=']'){
				return false;
			}
			outcome = json.substr(j,i-j+1);
		}
		else if(json[i]=='"'){
			++j;
			++i;
			for(;json[i]!='\0';++i){
				if(json[i]=='['){
					array_to_end(json);
					if(json[i]!=']'){
						return false;
					}
					continue;
				}
				if(json[i]=='{'){
					json_to_end(json);
					if(json[i]!='}'){
						return false;
					}
					continue;
				}
				if(json[i]=='"' && json[i-1]!='\\'){
					break;
				}
			}
			outcome = json.substr(j,i-j);
			if(json[i+1]=='}'){
				ss[str] = outcome;
				return true;
			}
		}
		else{
			return false;
		}
		ss[str] = outcome;
		i += 2;
	}
	return true;
}
