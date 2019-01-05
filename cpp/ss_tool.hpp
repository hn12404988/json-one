#ifndef hej_ss_tool_hpp
#define hej_ss_tool_hpp
#include "hej_type.hpp"
class ss_tool{
protected:
	hej::SS::iterator it, it_end;
	std::size_t i,j;
	std::string str;
	inline void json_to_end(std::string &json);
	inline void array_to_end(std::string &array);
	inline void escape(std::string &line);
public:
	std::string outcome;
	bool escape_quote {false};
	bool all_quote {false};
	void to_json(hej::SS &ss);
	bool json_to(hej::SS &ss,std::string &json);
	bool get_to(hej::SS &ss,std::string &json);
};

#endif /* hej_ss_tool_hpp */
