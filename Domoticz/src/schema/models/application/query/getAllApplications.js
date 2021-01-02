import ApplicationType from "../type/application";

export default (t) => 
    t.list.field("getAllApplications", {
        type: ApplicationType,
        nullable: true,
        async resolve(...params) {
            return await getAllApplication(...params)
        },
    });


const getAllApplication = async () => {
    return [
        {
            _id: "891374917391",
            title: "Domotics",
            description: "this is a try",
        },
        {
            _id: "891374917392",
            title: "Jeedmon",
            description: "this is a try",
        }
    ];
}