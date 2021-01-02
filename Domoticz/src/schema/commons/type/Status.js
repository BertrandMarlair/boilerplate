import { objectType } from "nexus";

const StatusType = objectType({
    name: "Status",
    definition(t) {
        t.string("title");
        t.field("code", {
            type: "String", 
            resolve({statusCode}){
                return statusCode
            }
        });
        t.string("color");
    }
});

export default StatusType;