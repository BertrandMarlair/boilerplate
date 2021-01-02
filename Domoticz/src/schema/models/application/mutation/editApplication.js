import ApplicationType from "../type/application";

export default (t) => 
    t.field("editApplication", {
        type: ApplicationType,
        async resolve(...params){
            return await editApplication(...params);
        }
    });

const editApplication = async () => {
    return {};
}