#include <iostream>
#include "ss_tool.hpp"
#include "ss_tool.cpp"

int main(){
    ss_tool tool;
    std::string str {"{"
        "\"menu\": {"
            "\"id\": \"file\","
            "\"value\": \"File\","
            "\"popup\": {"
                "\"menuitem\": ["
                "{\"value\": \"New\", \"onclick\": \"CreateNewDoc()\"},"
                "{\"value\": \"Open\", \"onclick\": \"OpenDoc()\"},"
                "{\"value\": \"Close\", \"onclick\": \"CloseDoc()\"}"
                "]"
            "}"
        "}"
    "}"};
    hej::SS object, object2;
    tool.json_to(object, str);
    std::cout << object["menu"] << std::endl;
    tool.json_to(object2, object["menu"]);
    std::cout << object2["id"] << std::endl;
    std::cout << object2["value"] << std::endl;
    std::cout << object2["popup"] << std::endl;
}
